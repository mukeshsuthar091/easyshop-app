import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from '.';

@Table(
    {
        tableName: 'product_sizes',
        timestamps: false,
    }
)
export class ProdSize extends Model<ProdSize> {

    @Column(
        {
            type: DataType.STRING(20),
            allowNull: false,
        }
    )
    size: string;

    @Column(
        {
            type: DataType.FLOAT,
            allowNull: false,
        }
    )
    price: number;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @ForeignKey(() => db.Product)
    productId: number;
}