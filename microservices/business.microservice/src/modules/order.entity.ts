import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from '.';

@Table(
    {
        tableName: 'orders',
        timestamps: false,
    }
)
export class Order extends Model<Order> {

    @Column(
        {
            type: DataType.ENUM('COD', 'ONLINE'),
            defaultValue: 'COD',
        }
    )
    payment_method: string;

    @Column(
        {
            type: DataType.FLOAT,
            defaultValue: 0,
        }
    )
    promo_discount: number;

    @Column(
        {
            type: DataType.FLOAT,
            defaultValue: 0,
        }
    )
    delivery_charge: number;

    @Column(
        {
            type: DataType.FLOAT,
            allowNull: false,
        }
    )
    sub_total: number;

    @Column(
        {
            type: DataType.FLOAT,
            allowNull: false,
        }
    )
    total_amount: number;

    @Column(
        {
            type: DataType.ENUM('PENDING', 'ORDERED', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED','PARTIAL_RETURN_REQUESTED', 'RETURN_REQUESTED','PARTIAL_RETURNED', 'RETURNED','ACCEPTED','REJECTED'),
            defaultValue: 'PENDING',
        }
    )
    status: string;

    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    cancellation_reason: string;

    @Column(
        {
            type: DataType.FLOAT,
            defaultValue: 0,
        }
    )
    refund_amount: number;

    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    return_reason: string;

    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    reject_reason: string;
    
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

    @ForeignKey(() => db.Coupon)
    addressId: number;

    @ForeignKey(() => db.User)
    userId: number;

    @ForeignKey(() => db.User)
    b_userId: number;
}