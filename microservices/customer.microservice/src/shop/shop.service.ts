import { HttpStatus, Injectable } from "@nestjs/common";
import { Response } from "express";

import { ResponseHandler } from "src/pkg/common";
import { AddFavDTO, ApplyCouponDTO, CartDTO, DeleteFavDTO, GetProdQueryDTO, SearchDTO, UpdateItemQuantityDTO} from "src/pkg/dto";
import { BannerHelper, CouponHandler, FavouriteHelper, ProductHelper } from "src/pkg/helper";
import { ErrorCode, ErrorMessage, SuccessMessage } from "src/core/constants";
import { homepage, searchResult} from "src/pkg/interfaces";
import { CartHelper } from "src/pkg/helper/cart.helper";
import { db } from "src/modules";
import { Cart } from "src/modules/cart.entity";

@Injectable()
export class ShopService {
    constructor(
        private product: ProductHelper,
        private banner: BannerHelper,
        private rest: ResponseHandler,
        private coupon: CouponHandler,
        private favourite: FavouriteHelper,
        private cart: CartHelper,
    ) { }

    async HomePage(Response: Response) {
        try {
            const banners: Array<any> = await this.banner.GetBanners();

            const popular_prods: Array<any> = await this.product.GetPopularProds();

            const categories: Array<any> = await this.product.GetAllCategory();

            const prodForYou: Array<any> = await this.product.GetRecommendedProds();

            const response: homepage = {
                banners,
                popular_prods,
                categories,
                prodForYou
            }

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.GET_HOMEPAGE_SUCCEED, response);
        }
        catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GetProduct(Query: GetProdQueryDTO, Response: Response) {
        try {

            if (Object.keys(Query).length === 0) throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_VALIDATION, undefined);

            const products: Array<any> = await this.product.GetProductsByFilter(Query);

            if (products.length === 0) return this.rest.SuccessJSONResponse(Response, HttpStatus.NOT_FOUND, ErrorMessage.ERROR_PRODUCT_NOT_FOUND, undefined);

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.GET_PRODUCT_SUCCEED, products);
        }
        catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GetSearch(Query: SearchDTO, Response: Response) {
        try {
            const search: searchResult = await this.product.GetSearch(Query);

            if (search.total == 0) return this.rest.SuccessJSONResponse(Response, HttpStatus.NOT_FOUND, ErrorMessage.ERROR_NO_DATA, undefined);

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.GET_SEARCH_SUCCEED, search.search);

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    // algoliasearch ...
    async GetSearchV2(Query: SearchDTO, Response: Response) {
        try {
            const search: any = await this.product.GetSearchV2(Query);

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.GET_SEARCH_SUCCEED, search);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GetCoupon(userId: number, Response: Response) {
        try {
            const coupons: Array<any> = await this.coupon.GetCouponByUserId(userId);

            if (coupons.length == 0) return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.NO_COUPON, coupons);

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.GET_COUPON_SUCCEED, coupons);

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async ApplyCoupon(userId: number, ReqBody: ApplyCouponDTO, Response: Response) {
        try {
            const coupon = await this.coupon.GetCoupon(ReqBody.couponId);

            if (!coupon) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, ErrorMessage.ERROR_COUPON_NOT_FOUND, undefined);

            if (ReqBody.sub_total < coupon.min_order_value) throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_MIN_ORDER_VALUE(coupon.min_order_value), undefined);

            const is_valid = await this.coupon.IsValid(ReqBody.couponId, coupon.applicable, userId);

            if (!is_valid) throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_LIMIT_REACHED, undefined);

            let promo_discount: number;

            if (coupon.is_percentage == 1) {
                const value: number = coupon.value;

                const discount: number = ReqBody.sub_total * value / 100;

                if (discount > coupon.max_discount) {
                    promo_discount = coupon.max_discount
                }
                else {
                    promo_discount = discount
                }
            }
            else {
                const value: number = coupon.value;

                const discount: number = ReqBody.sub_total - value;

                if (discount <= 0) {
                    promo_discount = ReqBody.sub_total
                }
                else {
                    promo_discount = ReqBody.sub_total - discount
                }
            }

            promo_discount = parseFloat(promo_discount.toFixed(2))

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.GET_COUPON_SUCCEED, { promo_discount });

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async AddFav(userId: number, ReqBody: AddFavDTO, Response: Response) {
        try {
            const favourite = await this.favourite.CreateFav(userId, ReqBody.productId)

            return this.rest.SuccessJSONResponse(Response, HttpStatus.CREATED, SuccessMessage.FAVOURITE_ADDED, favourite);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GetFav(userId: number, Response: Response) {
        try {
            const favourites = await this.favourite.GetFav(userId)

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.GET_FAVOURITE_SUCCEED, favourites);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async DeleteFav(userId: number, Query: DeleteFavDTO, Response: Response) {
        try {
            await this.favourite.DeleteFav(userId, Query.productId)

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.FAVOURITE_DELETED, undefined);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }


    async GetAllCartItems(uid: number, Response: Response){
        try{

            const cartItems = await this.cart.GetCartItems(uid);

            if (!cartItems) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, ErrorMessage.ERROR_CART_ITEMS_NOT_FOUND, undefined);

            return this.rest.SuccessJSONResponse(Response, HttpStatus.CREATED, "Cart Items fetch successfully.", cartItems);
            
        }catch(error){
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async AddToCart(payload: CartDTO, uid: number, Response: Response){
        try {
            const cartItems: any[] = await this.cart.GetCartItems(uid);

            let newCartItem: any;
            cartItems.forEach(async (cart) => {
                if((cart.Product.id === payload.productId) &&
                    (cart.ProdColor.id === payload.productColorId) &&
                    (cart.ProdSize.id === payload.productSizeId)
                ){
                    cart.quantity += payload.quantity;
                    newCartItem = cart;
                }
            });
            
            if(newCartItem){
                newCartItem.save();
            }
            else{

                const newPayload = {
                    userId: uid,
                    ...payload
                }

                const result = await this.cart.AddItemInCart(newPayload)
            }
            
            return this.rest.SuccessJSONResponse(Response, HttpStatus.CREATED, "Item successfully added in cart.", undefined);

        }catch(error){
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async RemoveCartItem(uid: number, cid: number, Response: Response){
        try {

            const cartItem: Cart = await this.cart.GetCartItem(cid, uid);
            if (!cartItem) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, 'Cart Item not found!' , undefined);

            await db.Cart.destroy({where: {id: cid}})

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Item successfully removed from cart.", undefined);
            
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GetCount(uid: number, Response: Response){
        try {

            const count: any = await db.Cart.count({
                where: {userId: uid}
            });

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Successfully get count of Cart Items. ", {count});
            
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async UpdateItemsQuantity(ReqBody: UpdateItemQuantityDTO, uid: number, Response: Response){
        try {
            
            const cid = ReqBody.cart_item_id;
            const op = ReqBody.operation;

            const cartItem: Cart = await this.cart.GetCartItem(cid, uid);
            if (!cartItem) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, 'Cart Item not found!' , undefined);

            if(op === "plus"){
                cartItem.quantity += 1;
            }
            else if(op === "minus"){
                cartItem.quantity -= 1;
            }

            cartItem.save();

            if(cartItem.quantity < 1){
                await cartItem.destroy()
                return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Item removed from cart.", undefined);
            }
            
            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Successfully updated cart-Item's count.", cartItem);
            
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }
}