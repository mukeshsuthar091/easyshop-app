import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { db } from '.';

@Table(
    {
        tableName: 'favourites',
        timestamps: false,
    }
)
export class Favourite extends Model<Favourite> {

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

    @ForeignKey(() => db.User)
    userId: number;
}