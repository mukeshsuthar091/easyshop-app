import { db } from "src/modules";
import { Sequelize } from 'sequelize-typescript';

export const AddRelationship = async (config) => {
    const sequelize = new Sequelize(config);

    sequelize.addModels(db.AllModels);

    db.AppToken.belongsTo(db.User, { foreignKey: 'userId', as: 'user', constraints: true, onDelete: 'CASCADE' });
    db.User.hasOne(db.AppToken, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' });

    db.Post.belongsTo(db.User, { foreignKey: 'userId', as: 'user', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.Post, { foreignKey: 'userId' });

    db.Post.belongsTo(db.SocialTopic, { foreignKey: 'socialTopicId', as: 'social_topic', constraints: true, onDelete: 'CASCADE' });
    db.SocialTopic.hasMany(db.Post, { foreignKey: 'socialTopicId' });

    db.PostImg.belongsTo(db.Post, { foreignKey: 'postId', constraints: true, onDelete: 'CASCADE' });
    db.Post.hasMany(db.PostImg, { foreignKey: 'postId', as: 'post_images' });

    db.Comment.belongsTo(db.Post, { foreignKey: 'postId', constraints: true, onDelete: 'CASCADE' });
    db.Post.hasMany(db.Comment, { foreignKey: 'postId', as: 'comments' });

    db.Comment.belongsTo(db.User, { foreignKey: 'userId', as: 'user', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.Comment, { foreignKey: 'userId' });

    db.Poll.belongsTo(db.User, { foreignKey: 'userId', as: 'user', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.Poll, { foreignKey: 'userId' });

    db.Poll.belongsTo(db.Product, { foreignKey: 'productId', as: 'product', constraints: true, onDelete: 'CASCADE' });
    db.Product.hasMany(db.Poll, { foreignKey: 'productId' });

    db.PollOption.belongsTo(db.Poll, { foreignKey: 'pollId', as: 'poll', constraints: true, onDelete: 'CASCADE' });
    db.Poll.hasMany(db.PollOption, { foreignKey: 'pollId', as: 'poll_options' });

    db.RewardPoint.belongsTo(db.User, { foreignKey: 'userId', as: 'user', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.RewardPoint, { foreignKey: 'userId' });

    db.RewardPoint.belongsTo(db.Poll, { foreignKey: 'pollId', as: 'poll', constraints: true, onDelete: 'CASCADE' });
    db.Poll.hasMany(db.RewardPoint, { foreignKey: 'pollId' });

    db.RewardPoint.belongsTo(db.User, { foreignKey: 'creatorId', as: 'creator', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.RewardPoint, { foreignKey: 'creatorId' });

    db.PostLike.belongsTo(db.User, { foreignKey: 'userId', as: 'user', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.PostLike, { foreignKey: 'userId' });

    db.PostImg.belongsTo(db.Post, { foreignKey: 'postId', as: 'post', constraints: true, onDelete: 'CASCADE' });
    db.Post.hasMany(db.PostLike, { foreignKey: 'postId' });

    db.Follow.belongsTo(db.User, { foreignKey: 'followerId', as: 'follower', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.Follow, { foreignKey: 'followerId' });

    db.Follow.belongsTo(db.User, { foreignKey: 'followedId', as: 'followed', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.Follow, { foreignKey: 'followedId' });

    await sequelize.sync();

    // await sequelize.sync({ force: true });

    return sequelize;
}