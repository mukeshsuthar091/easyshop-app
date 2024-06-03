import { HttpStatus, Injectable } from "@nestjs/common";
import algoliasearch from 'algoliasearch';
import { Response } from "express";

import { ErrorCode, SuccessMessage } from "src/core/constants";
import { db } from "src/modules";
import { Poll } from "src/modules/poll.entity";
import { ResponseHandler } from "src/pkg/common";
import { CreatePollDTO, CreatePostDTO, FeedLikeDTO, PostVoteDTO, SearchHashtagDTO } from "src/pkg/dto";
import { PostHelper } from "src/pkg/helper";
import { pagination } from "src/pkg/interfaces";
import { NotificationService } from "src/core/notifications/notification.service";

@Injectable()
export class SocialService {
    constructor(
        private post: PostHelper,
        private rest: ResponseHandler,
        private notification: NotificationService
    ) { }

    async GetFollowed({ uid, p, Response }: { uid: number; p: pagination; Response: Response; }) {
        try {
            const followers = await db.Follow.findAndCountAll({
                limit: p.limit,
                offset: p.limit * (p.page - 1),
                where: { followerId: uid, requested: false },
                include: {
                    model: db.User,
                    as: 'followed',
                    attributes: ['id', 'first_name', 'last_name', 'image']
                },
                attributes: ['id'],
                order: [['createdAt', 'DESC']]
            })
            return this.rest.PaginationResponse(Response, HttpStatus.OK, "Following list fetched successfully.", followers.rows, followers.count, p);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GetFollower({ uid, p, Response }: { uid: number; p: pagination; Response: Response; }) {
        try {
            const followers = await db.Follow.findAndCountAll({
                limit: p.limit,
                offset: p.limit * (p.page - 1),
                where: { followedId: uid, requested: false },
                include: {
                    model: db.User,
                    as: 'follower',
                    attributes: ['id', 'first_name', 'last_name', 'image']
                },
                attributes: ['id'],
                order: [['createdAt', 'DESC']]
            })
            return this.rest.PaginationResponse(Response, HttpStatus.OK, "Followes fetched successfully.", followers.rows, followers.count, p);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GetFollowRequest({ uid, p, Response }: { uid: number; p: pagination; Response: Response; }) {
        try {
            const requests = await db.Follow.findAndCountAll({
                limit: p.limit,
                offset: p.limit * (p.page - 1),
                where: { followedId: uid, requested: true },
                include: {
                    model: db.User,
                    as: 'follower',
                    attributes: ['id', 'first_name', 'last_name', 'image']
                },
                attributes: ['id'],
                order: [['createdAt', 'DESC']]
            })
            return this.rest.PaginationResponse(Response, HttpStatus.OK, "Follow requests fetched successfully.", requests.rows, requests.count, p);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async FollowRequest(uid: number, fuid: number, Response: Response) {
        try {
            if (uid == fuid) throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, "Can't raise request!", undefined);

            const isRequestExist = await db.Follow.findOne({
                where: { followerId: uid, followedId: fuid, requested: true }
            });
            if (isRequestExist) throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, "Request already generated!", undefined);

            await db.Follow.create({ followerId: uid, followedId: fuid, requested: true });
            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Follow request generated successfully.", undefined);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async RemoveFollowRequest(uid: number, frid: number, Response: Response) {
        try {
            const request = await db.Follow.findOne({
                where: { id: frid, requested: true }
            });
            if (!request)
                throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, "Request not exist!", undefined);

            if (uid === request.followedId || uid === request.followerId) {
                await request.destroy();
            } else {
                throw this.rest.GenerateError(HttpStatus.UNAUTHORIZED, ErrorCode.ERR_UNAUTHORIZED, "Request can't remove!", undefined);
            }
            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Follow request removed successfully.", undefined);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async ApproveFollowRequest(uid: number, frid: number, Response: Response) {
        try {
            const request = await db.Follow.findOne({
                where: { id: frid, requested: true }
            });
            if (!request)
                throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, "Request not exist!", undefined);

            if (uid !== request.followedId)
                throw this.rest.GenerateError(HttpStatus.UNAUTHORIZED, ErrorCode.ERR_UNAUTHORIZED, "Request can't approved!", undefined);

            request.requested = false;
            await request.save();

            const user: any = await db.AppToken.findOne({
                where: { userId: request.followerId },
                attributes: ['device_token', 'id', 'userId']
            });

            const sender = await db.User.findOne({
                where: { id: request.followedId },
                attributes: ['first_name', 'last_name']
            })

            if (sender && user && user.device_token) {
                const notification = {
                    title: `${sender.first_name} ${sender.last_name} has accepted your follow request.`,
                    body: `Click here to check ${sender.first_name} ${sender.last_name}'s profile!`
                }
                await this.notification.SendNotifications(user.device_token, { notification });
            }

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Follow request approved successfully.", undefined);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GetAllPost({ uid, p, Response }: { uid: number; p: pagination; Response: Response; }): Promise<Response<any, Record<string, any>>> {
        try {
            const { count, posts }: {
                count: number;
                posts: any;
            } = await this.post.GetAllMyPost(uid, p);

            return this.rest.PaginationResponse(Response, HttpStatus.OK, SuccessMessage.GET_POST_SUCCEED, posts, count, p);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    // async SearchHashtag(st: string, Response: Response): Promise<Response<any, Record<string, any>>> {
    //     try {
    //         const results: Array<string> = await this.post.GetSearch(st);
    //         return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.GET_HASHTAG_SUCCEED, results);
    //     } catch (error) {
    //         return this.rest.ErrorJSONResponse(Response, error);
    //     }
    // }

    async SearchHashtagV2(Query: SearchHashtagDTO, Response: Response) {
        try {
            const search: any = await this.post.GetSearchV2(Query);

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "HashTag get successfully.", search);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GetAllPoll({ uid, p, Response }: { uid: number; p: pagination; Response: Response; }): Promise<Response<any, Record<string, any>>> {
        try {
            const { count, polls }: {
                count: number;
                polls: Array<Poll>;
            } = await this.post.GetAllMyPoll(uid, p);

            return this.rest.PaginationResponse(Response, HttpStatus.OK, SuccessMessage.GET_POLL_SUCCEED, polls, count, p);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }


    async PostVoteOnPoll({ ReqBody, uid, Response }: { ReqBody: PostVoteDTO, uid: number, Response: Response }): Promise<Response<any, Record<string, any>>> {
        try {
            const { pollId, optionIds } = ReqBody;

            const is_already_voted = await this.post.CheckForVote(pollId, uid);
            if (is_already_voted) throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, "User already voted!", undefined);

            const poll_options = await this.post.GetPollOptions(pollId, optionIds);
            if (poll_options.length === 0) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Poll_options are not found!", undefined);

            for (let i = 0; i < poll_options.length; i++) {
                poll_options[i].vote_count += 1;
                await poll_options[i].save();
            }

            const poll = await this.post.GetPollById(pollId);
            if (!poll) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Poll is not found!", undefined);

            const reward_point_payload = {
                points: poll.reward_points,
                pollId,
                userId: uid,
                creatorId: poll.userId
            }
            await this.post.UpdateReward(reward_point_payload);

            const user: any = await db.AppToken.findOne({
                where: { userId: poll.userId },
                attributes: ['device_token', 'id', 'userId'],
                include: { model: db.User, as: 'user', attributes: ['first_name', 'last_name'] }
            });

            if (user && user.device_token) {
                const notification = {
                    title: `${user.user.first_name} ${user.user.last_name} voted on your poll '${poll.question}'`,
                    body: `Click here to check the results of the poll!`
                }
                await this.notification.SendNotifications(user.device_token, { notification });
            }

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.POST_VOTE_SUCCEED, poll);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GetRewardPointHistory(uid: number, Response: Response) {
        try {
            const { total_points, h } = await this.post.GetRewardPointHistory(uid);

            const history = [];
            h.map((ele: any) => {
                const object = {
                    id: ele.id,
                    points: ele.points,
                    creator_name: `${ele.creator.first_name} ${ele.creator.last_name}`,
                    userId: ele.userId,
                    pollId: ele.pollId,
                    creatorId: ele.creatorId,
                    createdAt: ele.createdAt,
                    updatedAt: ele.updatedAt,
                }
                history.push(object);
            })
            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.POST_VOTE_SUCCEED, { total_points, history });
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async CreatePoll(uid: number, payload: CreatePollDTO, Response: Response) {
        try {
            const { options } = payload;
            if (options.length < 2) throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, "Options length is must be grather than 2!", undefined);

            const poll = await this.post.CreatePoll(payload, uid);

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Poll created successfully.", poll);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async DeletePoll(uid: number, pid: number, Response: Response) {
        try {
            const poll = await db.Poll.findOne({
                where: { userId: uid, id: pid },
                attributes: ['id']
            });
            if (!poll) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Poll not found!", undefined);
            await poll.destroy();
            return Response.status(HttpStatus.NO_CONTENT).json(undefined);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async CreatePost(payload: CreatePostDTO, uid: number, Response: Response) {
        try {
            const { title, description, socialTopicId, hashtags } = payload;
            const hashtag_payload = [];
            const hashtagIds = [];

            for (let i = 0; i < hashtags.length; i++) {
                const hashtag = await db.HashTag.findOne({ where: { hashtag: hashtags[i] } });
                if (hashtag) {
                    // If hashtag already exist in DB...
                    hashtag.use_count += 1;
                    await hashtag.save();
                    hashtag_payload.push({
                        hashtag: hashtag.hashtag,
                        use_count: hashtag.use_count,
                        id: hashtag.id,
                        objectID: hashtag.id
                    });
                    hashtagIds.push(hashtag.id);
                } else {
                    // If new hashtag...
                    const new_hashtag = await db.HashTag.create({ hashtag: hashtags[i], use_count: 1 });
                    hashtag_payload.push({
                        hashtag: new_hashtag.hashtag,
                        use_count: new_hashtag.use_count,
                        id: new_hashtag.id,
                        objectID: new_hashtag.id
                    });
                    hashtagIds.push(new_hashtag.id);
                }
            }

            const social_topic = await db.SocialTopic.findOne({ where: { id: socialTopicId }, attributes: ['id', 'title', 'use_count'] });
            if (!social_topic) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Social topic not found!", undefined);

            const post: any = await db.Post.create({
                title,
                description,
                socialTopicId,
                userId: uid,
                hashtags: hashtagIds
            });

            social_topic.use_count = social_topic.use_count + 1;
            await social_topic.save();

            const client = algoliasearch(process.env.ALGO_APPLICATION_ID, process.env.ALGO_MASTER_API_KEY);
            const index = client.initIndex("TAG");

            await index.saveObjects(hashtag_payload);

            const hashtag_response: any = hashtag_payload.map(hashtag => ({ id: hashtag.id, hashtag: hashtag.hashtag, use_count: hashtag.use_count }))
            post.hashtags = hashtag_response;
            post.dataValues.social_topic = social_topic;

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Post created successfully.", post);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GetSocialTopics(Response: Response) {
        try {
            const social_topics = await db.SocialTopic.findAll({
                attributes: ['id', 'title'],
                order: [['use_count', 'DESC']]
            });

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Get social topics succeed.", social_topics);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async PostLike(Query: FeedLikeDTO, uid: number, Response: Response) {
        try {
            const { postId } = Query;

            const like = await db.PostLike.findOne({ where: { userId: uid, postId } });
            if (like) throw this.rest.GenerateError(HttpStatus.BAD_GATEWAY, ErrorCode.ERR_BAD_REQUEST, "User liked on this post already!", undefined)

            const post = await db.Post.findByPk(postId, { attributes: ['id', 'title', 'like_count', 'userId'] });
            if (!post) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Post not found!", undefined);
            post.like_count = post.like_count + 1;
            await post.save();

            await db.PostLike.create({ userId: uid, postId });

            const user = await db.AppToken.findOne({
                where: { userId: post.userId },
                attributes: ['device_token', 'id', 'userId']
            });

            const sender = await db.User.findOne({
                where: { id: uid },
                attributes: ['first_name', 'last_name']
            })

            if (sender && user && user.device_token) {
                const notification = {
                    title: `${sender.first_name} ${sender.last_name} liked your post '${post.title}'`,
                    body: "Click here to check the post!"
                }
                await this.notification.SendNotifications(user.device_token, { notification });
            }
            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Liked post successfully.", undefined);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async Test(Response: Response) {
        try {
            const device_token = "fRAwSSoTRyO68Bq32Juev5:APA91bHk8aORY7S0zAyOHY8d4-diGrZurMvowM-nYVOCjO9Xj_Ut01GrRt4ymS67gEHfwtdaYV4SlOA2LMNwM7akAegkRYnQS5WeMGX923KsTeIeTs81c5IBQTbQjfik7c_BWjEqWL-4"
            const notification = await this.notification.SendNotifications(
                device_token,
                { notification: { title: "Your order status has been changed!", body: 'Click here to check.' } }
            );

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Notification sent successfully.", notification);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }
}