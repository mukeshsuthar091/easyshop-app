import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table(
    {
        tableName: 'coupons',
        timestamps: false,
    }
)
export class Coupon extends Model<Coupon> {

    @Column(
        {
            type: DataType.TEXT,
            allowNull: false,
        }
    )
    code: string;

    @Column(
        {
            type: DataType.STRING(20),
            allowNull: false,
        }
    )
    title: string;

    @Column(
        {
            type: DataType.TEXT,
            allowNull: false,
        }
    )
    description: string;

    @Column(
        {
            type: DataType.STRING,
        }
    )
    expiry: string;

    @Column(
        {
            type: DataType.TINYINT,
            defaultValue: 1,
        }
    )
    is_percentage: number;

    @Column(
        {
            type: DataType.FLOAT,
            allowNull: false,
        }
    )
    value: number;

    @Column(
        {
            type: DataType.FLOAT,
            allowNull: false,
        }
    )
    max_discount: number;

    @Column(
        {
            type: DataType.FLOAT,
            allowNull: false,
        }
    )
    min_order_value: number;

    @Column(
        {
            type: DataType.INTEGER,
            allowNull: false,
        }
    )
    applicable:number;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

}