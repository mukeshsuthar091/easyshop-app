import { db } from "src/modules";
import { Sequelize } from 'sequelize-typescript';

export const AddRelationship = async (config) => {
    const sequelize = new Sequelize(config);
    sequelize.addModels(db.AllModels);

    db.User.hasOne(db.AppToken, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' });

    db.Business.belongsTo(db.User, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' });
    db.User.hasOne(db.Business, { foreignKey: 'userId' });
    // TODO: store - implement store.
    // TODO: pradip - add depndancy between products and store.
    db.Address.belongsTo(db.User, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.Address, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' });

    db.Banner.belongsTo(db.Product, { foreignKey: 'productId', constraints: true, onDelete: 'CASCADE' });
    db.Product.hasMany(db.Banner, { foreignKey: 'productId' });

    db.Category.belongsTo(db.User, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.Category, { foreignKey: 'userId'});

    db.SubCategory.belongsTo(db.User, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.SubCategory, { foreignKey: 'userId'});

    db.Product.belongsTo(db.User, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' });
    db.User.hasMany(db.Product, { foreignKey: 'userId'});
    
    db.SubCategory.belongsTo(db.Category, { foreignKey: 'categoryId', constraints: true, onDelete: 'CASCADE' });
    db.Category.hasMany(db.SubCategory, { foreignKey: 'categoryId' });

    db.Product.belongsTo(db.Category, { foreignKey: 'categoryId', constraints: true, onDelete: 'CASCADE' });
    db.Category.hasMany(db.Product, { foreignKey: 'categoryId' });

    db.Product.belongsTo(db.SubCategory, { foreignKey: 'subCategoryId', constraints: true, onDelete: 'CASCADE' });
    db.SubCategory.hasMany(db.Product, { foreignKey: 'subCategoryId' });

    db.ProdColor.belongsTo(db.Product, { foreignKey: 'productId', constraints: true, onDelete: 'CASCADE' });
    db.Product.hasMany(db.ProdColor, { foreignKey: 'productId' });

    db.ProdImage.belongsTo(db.Product, { foreignKey: 'productId', constraints: true, onDelete: 'CASCADE' });
    db.Product.hasMany(db.ProdImage, { foreignKey: 'productId' })

    db.ProdSize.belongsTo(db.Product, { foreignKey: 'productId', constraints: true, onDelete: 'CASCADE' });
    db.Product.hasMany(db.ProdSize, { foreignKey: 'productId' });

    db.ProdSpec.belongsTo(db.Product, { foreignKey: 'productId', constraints: true, onDelete: 'CASCADE' });
    db.Product.hasMany(db.ProdSpec, { foreignKey: 'productId' });

    db.UserCoupon.belongsTo(db.Coupon, { foreignKey: 'couponId', constraints: true, onDelete: 'CASCADE' })
    db.Coupon.hasMany(db.UserCoupon, { foreignKey: 'couponId' });

    db.UserCoupon.belongsTo(db.User, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' })
    db.User.hasMany(db.UserCoupon, { foreignKey: 'userId' });

    db.Favourite.belongsTo(db.Product, { foreignKey: 'productId', constraints: true, onDelete: 'CASCADE' })
    db.Product.hasMany(db.Favourite, { foreignKey: 'productId' });

    db.Favourite.belongsTo(db.User, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' })
    db.User.hasMany(db.Favourite, { foreignKey: 'userId' });

    db.Order.belongsTo(db.Coupon, { foreignKey: 'couponId', constraints: true, onDelete: 'CASCADE' })
    db.Coupon.hasMany(db.Order, { foreignKey: 'couponId' });

    db.Order.belongsTo(db.User, { foreignKey: 'userId', constraints: true, onDelete: 'CASCADE' })
    db.User.hasMany(db.Order, { foreignKey: 'userId' });

    db.OrderProd.belongsTo(db.Order, { foreignKey: 'orderId', constraints: true, onDelete: 'CASCADE' })
    db.Order.hasMany(db.OrderProd, { foreignKey: 'orderId' });

    db.OrderProd.belongsTo(db.Product, { foreignKey: 'productId', as: 'product', constraints: true, onDelete: 'CASCADE' })
    db.Product.hasOne(db.OrderProd, { foreignKey: 'productId' });

    db.OrderProd.belongsTo(db.ProdColor, { foreignKey: 'productColorId', as: 'product_color', constraints: true, onDelete: 'CASCADE' })
    db.ProdColor.hasOne(db.OrderProd, { foreignKey: 'productColorId' });

    db.OrderProd.belongsTo(db.ProdSize, { foreignKey: 'productSizeId', as: 'product_size', constraints: true, onDelete: 'CASCADE' })
    db.ProdSize.hasOne(db.OrderProd, { foreignKey: 'productSizeId' });

    db.Order.belongsTo(db.Address, { foreignKey: 'addressId', constraints: true, onDelete: 'CASCADE' });
    db.Address.hasMany(db.Order, { foreignKey: 'addressId' });

    db.Order.belongsTo(db.Coupon, { foreignKey: 'couponId', constraints: true, onDelete: 'CASCADE' });
    db.Coupon.hasMany(db.Order, { foreignKey: 'couponId' });
    
    db.Order.belongsTo(db.User, { foreignKey: "userId", constraints: true, onDelete: 'CASCADE'});
    db.User.hasMany(db.Order, {foreignKey: "userId" });

    db.Order.belongsTo(db.User, { foreignKey: 'b_userId', constraints: true, onDelete: 'CASCADE' })
    db.User.hasMany(db.Order, { foreignKey: 'b_userId' });

    db.Payment.belongsTo(db.User, { foreignKey: "userId", constraints: true, onDelete: 'CASCADE'});
    db.User.hasMany(db.Payment, {foreignKey: "userId" });

    db.Payment.belongsTo(db.Order, { foreignKey: "orderId", constraints: true, onDelete: 'CASCADE'});
    db.Order.hasOne(db.Payment, {foreignKey: "orderId" });

    await sequelize.sync();

    // await sequelize.sync({ force: true });

    return sequelize;
}
