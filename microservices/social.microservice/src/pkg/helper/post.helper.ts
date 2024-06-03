import { Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import { db } from "src/modules";
import { Poll } from "src/modules/poll.entity";
import { Post } from "src/modules/post.entity";
import { CreatePollDTO, SearchHashtagDTO } from "../dto";
import { pagination } from "../interfaces";
import algoliasearch from 'algoliasearch';

interface user {
    first_name: string,
    last_name: string,
    image: string
}

interface hashtag {
    id?: number,
    hashtag: string,
    use_count: number
}

interface post_image {
    id: number,
    image: string
}

interface post_comment {
    id: number,
    comment: string
    user: user
}

interface post {
    id?: number,
    title: string,
    description: string,
    hashtag_details?: hashtag[],
    like_count: number,
    createdAt: Date,
    updatedAt: Date,
    userId: number,
    socialTopicId: number
    social_topic?: {
        id: 2,
        title: string
    },
    post_images?: post_image[],
    comments?: post_comment[],
    user?: user,
    liked?: boolean,
    hashtags?: number[],
    dataValues?: any
}

@Injectable()
export class PostHelper {
    constructor() { }

    async GetAllMyPost(uid: number, p: pagination): Promise<{
        count: number;
        posts: Array<post>;
    }> {
        try {
            const count = await db.Post.count({ where: { userId: uid } });
            if (count === 0) return { count, posts: [] };

            const posts: post[] = await db.Post.findAll({
                limit: p.limit,
                offset: p.limit * (p.page - 1),
                where: { userId: uid },
                include: [
                    { model: db.SocialTopic, as: 'social_topic', attributes: ['id', 'title'] },
                    { model: db.PostImg, as: 'post_images' },
                    {
                        model: db.Comment, as: 'comments', include: [
                            { model: db.User, as: 'user', attributes: ['first_name', 'last_name', 'image'] }
                        ]
                    },
                    { model: db.User, as: 'user', attributes: ['first_name', 'last_name', 'image'] },
                ],
                order: [['createdAt', 'DESC']]
            });

            for (let i = 0; i < posts.length; i++) {
                const like: any = await this.checkForLike(uid, posts[i].id);
                posts[i].dataValues.liked = like
                if (posts[i].hashtags.length !== 0) {
                    const hashtags: any = await db.HashTag.findAll({ where: { id: posts[i].hashtags }, attributes: ['id', 'hashtag', 'use_count'] });
                    posts[i].hashtags = hashtags
                }
            }
            return { count, posts };
        } catch (error) {
            throw error;
        }
    }

    async checkForLike(uid: number, pid: number): Promise<boolean> {
        const liked = await db.PostLike.findOne({ where: { userId: uid, postId: pid } });
        if (liked) {
            return true;
        }
        return false;
    }

    async GetAllMyPoll(uid: number, p: pagination): Promise<{
        count: number;
        polls: Array<Poll>;
    }> {
        try {
            const count = await db.Poll.count({ where: { userId: uid } });
            if (count === 0) return { count, polls: [] };

            const polls = await db.Poll.findAll({
                limit: p.limit,
                offset: p.limit * (p.page - 1),
                where: { userId: uid },
                include: { model: db.PollOption, as: 'poll_options', attributes: ['id', 'option', 'vote_count'] },
            });
            return { count, polls };
        } catch (error) {
            throw error;
        }
    }

    // async GetSearch(st: string): Promise<Array<string>> {
    //     try {
    //         const hashtag = await db.Post.findAll({
    //             where: { hashtags: { [Op.like]: '%' + st + '%' } },
    //             attributes: ['hashtags'],
    //             group: ['hashtags']
    //         });
    //         return hashtag.map(ele => ele.hashtags);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async GetPollOptions(pollId: number, optionIds: number[]): Promise<Array<any>> {
        try {
            const poll_options = await db.PollOption.findAll({
                where: { pollId: pollId, id: optionIds },
                attributes: ['id', 'option', 'vote_count', 'pollId']
            })
            return poll_options;
        } catch (error) {
            throw error;
        }
    }

    async GetPollById(pollId: number): Promise<any> {
        try {
            const poll = await db.Poll.findOne({
                where: { id: pollId },
                include: { model: db.PollOption, as: 'poll_options', attributes: ['id', 'option', 'vote_count'] }
            })
            return poll;
        } catch (error) {
            throw error;
        }
    }

    async CheckForVote(pollId: number, uid: number): Promise<Boolean> {
        try {
            const isAlreadyVoted = await db.RewardPoint.findOne({ where: { userId: uid, pollId }, attributes: ['id'] });
            return isAlreadyVoted ? true : false;
        } catch (error) {
            throw error;
        }
    }

    async UpdateReward(payload) {
        try {
            await db.RewardPoint.create(payload);
        } catch (error) {
            throw error;
        }
    }

    async GetRewardPointHistory(uid: number) {
        try {

            const total_points = await db.RewardPoint.sum('points', {
                where: { userId: uid }
            });

            const h = await db.RewardPoint.findAll({
                where: { userId: uid },
                include: { model: db.User, foreignKey: 'creatorId', as: 'creator', attributes: ['first_name', 'last_name'] }
            })
            return { total_points: total_points, h }
        } catch (error) {
            throw error;
        }
    }

    async CreatePoll(payload: CreatePollDTO, uid: number) {
        try {
            const { question, multiple_select, options, privacy, expiry, productId } = payload;
            const poll = await db.Poll.create({
                question,
                privacy,
                expiry,
                reward_points: 50,
                multiple_select,
                userId: uid,
                productId
            });

            const poll_option_payload = options.map(option => {
                return {
                    option: option,
                    pollId: poll.id
                }
            });

            const poll_options = await db.PollOption.bulkCreate(poll_option_payload);

            const poll_response = {
                poll,
                options: [
                    ...poll_options
                ]
            }

            return poll_response;
        } catch (error) {
            throw error;
        }
    }

    async GetSearchV2(Query: SearchHashtagDTO) {
        try {
            const client = algoliasearch(process.env.ALGO_APPLICATION_ID, process.env.ALGO_SEARCH_ONLY_API_KEY);
            const index = client.initIndex("TAG");

            let limit = Query.limit ? Query.limit : 20;
            let page = Query.page ? Query.page : 1;
            page != 0 ? page-- : page

            const result = await index.search(Query.term, { hitsPerPage: limit, page: page });

            if (result?.hits.length !== 0) {
                result.hits.forEach((element: any) => {
                    delete element.objectID;
                    delete element._highlightResult;
                });

                return { results: result.hits, totalPage: result.nbPages, limit: result.hitsPerPage, total: result.nbHits, hasMore: result.nbHits > Query.page * limit ? true : false };
            }
            return { result: [], totalPage: 0, limit: limit, total: 0, hasMore: false }
        } catch (error) {
            throw error;
        }
    }

}