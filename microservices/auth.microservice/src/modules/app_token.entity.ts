import { Table, Column, Model, DataType, HasOne, ForeignKey } from 'sequelize-typescript';
import { User } from './user.entity';

@Table(
    {
        tableName: 'app_tokens',
        timestamps: false,
    }
)
export class AppToken extends Model<AppToken> {

    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    access_token: string;

    @Column(
        {
            type: DataType.ENUM('Bearer'),
            allowNull: false,
            defaultValue: 'Bearer',
        }
    )
    token_type: string;

    @Column(
        {
            type: DataType.ENUM('active', 'expired'),
            allowNull: false,
            defaultValue: 'active',
        }
    )
    status: string;

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
            defaultValue: 0,
        }
    )
    access_count: number;

    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    device_token: string;

    @Column(
        {
            type: DataType.TINYINT,
            comment: '0 = iOS, 1 = Android, 2 = Postman, 3 = Browser',
            defaultValue: 0
        }
    )
    device_type: string;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @ForeignKey(() => User)
    @Column({field: 'userId'})
    userId: number
}