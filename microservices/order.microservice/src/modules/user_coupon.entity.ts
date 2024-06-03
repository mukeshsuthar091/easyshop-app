import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from '.';

@Table(
    {
        tableName: 'user_coupons',
        timestamps: false,
    }
)
export class UserCoupon extends Model<UserCoupon> {

    @Column(
        {
            type: DataType.INTEGER,
            defaultValue: 0,
        }
    )
    use_count: number;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @ForeignKey(() => db.Coupon)
    couponId: number;

    @ForeignKey(() => db.User)
    userId: number;
}