import { AppToken } from './app_token.entity';
import { Banner } from './banner.entity';
import { Category } from './category.entity';
import { Product } from './product.entity';
import { SubCategory } from './sub_category.entity';
import { User } from './user.entity';
import { ProdColor } from "./product_color.entity";
import { ProdImage } from './product_image.entity';
import { ProdSize } from './product_size.entity';
import { ProdSpec } from './product_spec.entity';
import { Coupon } from './coupon.entity';
import { UserCoupon } from './user_coupon.entity';
import { Favourite } from './favourite.entity';
import { Order } from './order.entity';
import { OrderProd } from './order_product.entity';
import { Address } from './address.entity';
import { Payment } from './payment.entity';
import { Business } from './business.entity';

const model: {
    User: typeof User;
    Business: typeof Business;
    AppToken: typeof AppToken;
    Address: typeof Address;
    Banner: typeof Banner;
    Category: typeof Category;
    SubCategory: typeof SubCategory;
    Product: typeof Product;
    ProdColor: typeof ProdColor;
    ProdImage: typeof ProdImage;
    ProdSize: typeof ProdSize;
    ProdSpec: typeof ProdSpec;
    Coupon: typeof Coupon;
    UserCoupon: typeof UserCoupon;
    Favourite: typeof Favourite;
    Order: typeof Order;
    OrderProd: typeof OrderProd;
    Payment: typeof Payment;
    AllModels?: Array<any>;
} = {
    User,
    Business,
    AppToken,
    Address,
    Banner,
    Category,
    SubCategory,
    Product,
    ProdColor,
    ProdImage,
    ProdSize,
    ProdSpec,
    Coupon,
    UserCoupon,
    Favourite,
    Order,
    OrderProd,
    Payment,
}
model.AllModels = Object.values(model);

export const db = model;