import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table(
    {
        tableName: 'hashtages',
        timestamps: false,
    }
)
export class HashTag extends Model<HashTag> {

    @Column(
        {
            type: DataType.STRING(30),
            allowNull: false,
        }
    )
    hashtag: string;

    @Column(
        {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 1
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