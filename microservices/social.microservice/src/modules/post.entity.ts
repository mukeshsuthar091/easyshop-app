import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from './index'

@Table(
    {
        tableName: 'posts',
        timestamps: false,
    }
)
export class Post extends Model<any> {

    @Column(
        {
            type: DataType.STRING(30),
            allowNull: false,
        }
    )
    title: string;

    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    description: string;

    @Column(
        {
            type: DataType.JSON,
            defaultValue: null,
        }
    )
    hashtags: number[];

    @Column(
        {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    )
    like_count: number;

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

    @ForeignKey(() => db.SocialTopic)
    socialTopicId: number;
}