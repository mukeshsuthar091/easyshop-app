import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from './index'

@Table(
    {
        tableName: 'cart',
        timestamps: false,
    }
)
export class Cart extends Model<Cart> {

    @Column(
        {
            type: DataType.INTEGER,
            allowNull   : false,
        }
    )
    quantity: number;

    @Column(
        {
            type: DataType.ENUM('ACTIVE', 'SAVED_FOR_LATER', 'REMOVED', 'WISHLIST', 'ORDERED'),
            defaultValue: 'ACTIVE',
        }
    )
    status: string;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @ForeignKey(() => db.User)
    userId: number;

    @ForeignKey(() => db.User)
    b_userId: number;

    @ForeignKey(() => db.Product)
    productId: number;

    @ForeignKey(() => db.ProdColor)
    productColorId: number;

    @ForeignKey(() => db.ProdSize)
    productSizeId: number;
}
