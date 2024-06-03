import { db } from "src/modules";
import { Sequelize } from 'sequelize-typescript';

export const AddRelationship = async (config) => {
    const sequelize = new Sequelize(config);

    sequelize.addModels(db.AllModels);

    db.User.hasOne(db.AppToken, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' });

    db.Business.belongsTo(db.User, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' });
    db.User.hasOne(db.Business, { foreignKey: 'userId' });
    
    db.Address.belongsTo(db.User, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.Address, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' });

    await sequelize.sync();

    // await sequelize.sync({ force: true });

    return sequelize;
}