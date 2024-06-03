import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from '.';

@Table(
    {
        tableName: 'product_colors',
        timestamps: false,
    }
)
export class ProdColor extends Model<ProdColor> {

    @Column(
        {
            type: DataType.STRING(20),
            allowNull: true,
        }
    )
    color: string;

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