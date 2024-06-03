import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from '.';

@Table(
    {
        tableName: 'comments',
        timestamps: false,
    }
)
export class Comment extends Model<Comment> {

    @Column(
        {
            type: DataType.STRING(30),
            allowNull: false,
        }
    )
    comment: string;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @ForeignKey(() => db.Post)
    postId: number

    @ForeignKey(() => db.User)
    userId: number
}