import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table(
    {
        tableName: 'social_topics',
        timestamps: false,
    }
)
export class SocialTopic extends Model<SocialTopic> {

    @Column(
        {
            type: DataType.STRING(30),
            allowNull: false,
        }
    )
    title: string;

    @Column(
        {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    )
    use_count: number;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}