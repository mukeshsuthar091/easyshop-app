import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { db } from './index'

@Table(
    {
        tableName: 'addresses',
        timestamps: false,
    }
)
export class Address extends Model<Address> {

    @Column(
        {
            type: DataType.TEXT,
            allowNull: false,
        }
    )
    address: string;

    @Column(
        {
            type: DataType.ENUM('Home', 'Office', 'Other'),
            allowNull: false,
            defaultValue: 'Home',
        }
    )
    address_type: string;

    @Column(
        {
            type: DataType.FLOAT,
            allowNull: false,
        }
    )
    latitude: number;

    @Column(
        {
            type: DataType.FLOAT,
            allowNull: false,
        }
    )
    longitude: number;

    @Column(
        {
            type: DataType.STRING(20),
            allowNull: false,
        }
    )
    city: string;

    @Column(
        {
            type: DataType.STRING(20),
            allowNull: false,
        }
    )
    state: string;

    @Column(
        {
            type: DataType.STRING(20),
            allowNull: false,
        }
    )
    country: string;

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
}