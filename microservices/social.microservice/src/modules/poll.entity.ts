import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from './index'

@Table(
    {
        tableName: 'polls',
        timestamps: false,
    }
)
export class Poll extends Model<Poll> {

    @Column(
        {
            type: DataType.TEXT,
            allowNull: false,
        }
    )
    question: string;

    @Column(
        {
            type: DataType.ENUM('public', 'private', 'family'),
            allowNull: false,
            defaultValue: 'public',
        }
    )
    privacy: string;

    @Column(
        {
            type: DataType.DATE,
            defaultValue: null
        }
    )
    expiry: string;

    @Column(
        {
            type: DataType.INTEGER,
            defaultValue: 50,
        }
    )
    reward_points: number;

    @Column(
        {
            type: DataType.BOOLEAN,
            defaultValue: false,
        }
    )
    multiple_select: boolean;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @ForeignKey(() => db.User)
    userId: number

    @ForeignKey(() => db.Product)
    productId: number
}