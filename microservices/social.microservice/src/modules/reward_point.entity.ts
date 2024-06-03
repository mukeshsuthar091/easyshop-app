import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from './index'

@Table(
    {
        tableName: 'reward_points',
        timestamps: false,
    }
)
export class RewardPoint extends Model<RewardPoint> {

    @Column(
        {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    )
    points: number;

    // @Column(
    //     {
    //         type: DataType.INTEGER,
    //         defaultValue: 0
    //     }
    // )
    // creatorId: number;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @ForeignKey(() => db.Poll)
    pollId: number;

    @ForeignKey(() => db.User)
    userId: number;

    @ForeignKey(() => db.User)
    creatorId: number;
}