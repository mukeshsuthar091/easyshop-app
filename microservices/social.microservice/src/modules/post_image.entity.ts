import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from './index'

@Table(
    {
        tableName: 'post_images',
        timestamps: false,
    }
)
export class PostImg extends Model<PostImg> {

    @Column(
        {
            type: DataType.TEXT,
            allowNull: false,
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

    @ForeignKey(() => db.Post)
    postId: number
}