import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from '.';

@Table(
    {
        tableName: 'products',
        timestamps: false,
    }
)
export class Product extends Model<Product> {

    @Column(
        {
            type: DataType.STRING(20),
            allowNull: false,
        }
    )
    name: string;

    @Column(
        {
            type: DataType.TEXT,
            allowNull: true,
        }
    )
    description: string;
    
        @Column(
            {
                type: DataType.TEXT,
                allowNull: true,
            }
        )
        additional_info: string;

    @Column(
        {
            type: DataType.TEXT,
            allowNull: true,
        }
    )
    additional_details: string;

    @Column(
        {
            type: DataType.INTEGER,
            defaultValue: 0,
        }
    )
    order_count: number;

    @Column(
        {
            type: DataType.FLOAT,
            defaultValue: 0,
        }
    )
    rate_avg: number;

    @Column(
        {
            type: DataType.INTEGER,
            defaultValue: 0,
        }
    )
    rate_count: number;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @ForeignKey(() => db.Category)
    categoryId: number;
    
    @ForeignKey(() => db.SubCategory)
    subCategoryId: number;
}