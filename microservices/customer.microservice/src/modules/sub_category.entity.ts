import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from '.';

@Table(
    {
        tableName: 'sub_categories',
        timestamps: false,
    }
)
export class SubCategory extends Model<SubCategory> {

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
            allowNull: true,
        }
    )
    image: string;

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
}