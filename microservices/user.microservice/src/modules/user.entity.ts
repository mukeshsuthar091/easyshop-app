import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table(
    {
        tableName: 'users',
        timestamps: false,
    }
)
export class User extends Model<User> {

    @Column(
        {
            type: DataType.INTEGER,
            allowNull: false
        }
    )
    role: number;

    @Column(
        {
            type: DataType.STRING(50),
            allowNull: false,
        }
    )
    first_name: string;

    @Column(
        {
            type: DataType.STRING(50),
            allowNull: false,
        }
    )
    last_name: string;

    @Column(
        {
            type: DataType.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        }
    )
    email: string;

    @Column(
        {
            type: DataType.STRING(100),
            allowNull: false,
        }
    )
    password: string;

    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    image: string;

    @Column(
        {
            type: DataType.STRING(5),
            allowNull: false,
        }
    )
    country_code: string;

    @Column(
        {
            type: DataType.BIGINT,
            allowNull: false,
            unique: true,
        }
    )
    phone: number;

    @Column(
        {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    )
    reward_points: number;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}