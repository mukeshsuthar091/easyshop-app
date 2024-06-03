import { db } from "src/modules";
import { Sequelize } from 'sequelize-typescript';

export const AddRelationship = async (config) => {
    const sequelize = new Sequelize(config);
    sequelize.addModels([db.User, db.Business, db.AppToken]);


    db.AppToken.belongsTo(
        db.User,
        {
            foreignKey: 'userId',
            constraints: true,
            onDelete: 'CASCADE'
        }
    );

    db.RewardPoint.belongsTo(db.User, { foreignKey: 'userId', as: 'user', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.RewardPoint, { foreignKey: 'userId' });

    db.RewardPoint.belongsTo(db.User, { foreignKey: 'creatorId', as: 'creator', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.RewardPoint, { foreignKey: 'creatorId' });

    db.Follow.belongsTo(db.User, { foreignKey: 'followerId', as: 'follower', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.Follow, { foreignKey: 'followerId' });

    db.Follow.belongsTo(db.User, { foreignKey: 'followedId', as: 'followed', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.Follow, { foreignKey: 'followedId' });

    db.Business.belongsTo(db.User, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' });
    db.User.hasOne(db.Business, { foreignKey: 'userId' });


    await sequelize.sync();

    // await sequelize.sync(
    //    {
    //       force: true
    //    }
    // );

    return sequelize;
}