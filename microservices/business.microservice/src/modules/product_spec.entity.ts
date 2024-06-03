import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from '.';

@Table(
    {
        tableName: 'product_specifications',
        timestamps: false,
    }
)
export class ProdSpec extends Model<ProdSpec> {

    @Column(
        {
            type: DataType.STRING(20),
            allowNull: true,
        }
    )
    title: string;

    @Column(
        {
            type: DataType.STRING(20),
            allowNull: true,
        }
    )
    value: string;

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