import { AppToken } from './app_token.entity';
import { User } from './user.entity';
import { Post } from './post.entity';
import { SocialTopic } from './social_topic.entity';
import { PostImg } from './post_image.entity';
import { Comment } from './comment.entity';
import { Product } from './product.entity';
import { Category } from './category.entity';
import { SubCategory } from './sub_category.entity';
import { Poll } from './poll.entity';
import { PollOption } from './poll_option.entity';
import { RewardPoint } from './reward_point.entity';
import { HashTag } from './hashtag.entity';
import { PostLike } from './post_like.entity';
import { Follow } from './follow.entity';

export const db = {
    User,
    AppToken,
    Post,
    SocialTopic,
    PostImg,
    Comment,
    Product,
    Category,
    SubCategory,
    Poll,
    PollOption,
    RewardPoint,
    HashTag,
    PostLike,
    Follow,
    AllModels: [User, AppToken, Post, SocialTopic, PostImg, Comment, Product, Category, SubCategory, Poll, PollOption, RewardPoint, HashTag, PostLike, Follow]
}