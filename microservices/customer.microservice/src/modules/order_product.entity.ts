import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from '.';

@Table(
    {
        tableName: 'order_products',
        timestamps: false,
    }
)
export class OrderProd extends Model<OrderProd> {

    @Column(
        {
            type: DataType.INTEGER,
            allowNull   : false,
        }
    )
    quantity: number;

    @Column(
        {
            type: DataType.FLOAT,
            defaultValue: 0,
        }
    )
    rate: number;
    
    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    rate_description: string;

    @Column(
        {
            type: DataType.ENUM('PENDING', 'ORDERED', 'PACKED', 'SHIPPED', 'DELIVERED', 'RETURN_REQUESTED', 'RETURNED'),
            defaultValue: 'PENDING',
        }
    )
    status: string;

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

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @ForeignKey(() => db.Order)
    orderId: number;

    @ForeignKey(() => db.Product)
    productId: number;

    @ForeignKey(() => db.ProdColor)
    productColorId: number;

    @ForeignKey(() => db.ProdSize)
    productSizeId: number;

}