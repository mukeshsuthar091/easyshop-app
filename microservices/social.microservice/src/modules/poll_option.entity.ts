import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from './index'

@Table(
    {
        tableName: 'poll_options',
        timestamps: false,
    }
)
export class PollOption extends Model<PollOption> {

    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    option: string;

    @Column(
        {
            type: DataType.INTEGER,
            defaultValue: 0
        }
    )
    vote_count: number;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @ForeignKey(() => db.Poll)
    pollId: number
}