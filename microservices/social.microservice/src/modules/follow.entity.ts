import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from '.';

@Table(
    {
        tableName: 'follows',
        timestamps: false,
    }
)
export class Follow extends Model<Follow> {

    @Column(
        {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    )
    requested: boolean;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @ForeignKey(() => db.User)
    followerId: number

    @ForeignKey(() => db.User)
    followedId: number
}