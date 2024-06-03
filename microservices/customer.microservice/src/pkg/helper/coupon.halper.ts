import { Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import { db } from "src/modules";

@Injectable()
export class CouponHandler {
    async GetCouponByUserId(userId: number) {
        try {
            const coupons = await db.UserCoupon.findAll({
                where: { userId },
                include: {
                    model: db.Coupon
                }
            });

            return coupons;
        } catch (error) {
            throw error;
        }
    }

    async GetCoupon(couponId: number) {
        try {
            const coupon = await db.Coupon.findByPk(couponId)

            return coupon;
        } catch (error) {
            throw error;
        }
    }

    async IsValid(couponId: number, applicable_count: number, userId: number) {
        try {
            const coupon = db.UserCoupon.findOne(
                {
                    where: { couponId, use_count: { [Op.lt]: applicable_count }, userId: userId }
                }
            );

            return coupon;
        } catch (error) {
            throw error;
        }
    }
}