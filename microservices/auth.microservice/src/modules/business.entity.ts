import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './user.entity';

@Table(
    {
        tableName: 'business',
        timestamps: false,
    }
)
export class Business extends Model<Business> {
    
    @Column(
        {
            type: DataType.STRING,
            allowNull: false,
        }
    )
    business_name: string;

    @Column(
        {
            type: DataType.TEXT,
            allowNull: true,
        }
    )
    business_logo: string;
   
    @Column(
        {
            type: DataType.STRING,
            allowNull: true,
        }
    )
    category: string;

    @Column(
        {
            type: DataType.STRING,
            allowNull: true,
        }
    )
    sub_category: string;

    @Column(
        {
            type: DataType.STRING,
            allowNull: false,
        }
    )
    city: string;

    @Column(
        {
            type: DataType.STRING,
            allowNull: false,
        }
    )
    state: string;

    @Column(
        {
            type: DataType.STRING,
            allowNull: false,
        }
    )
    country: string;

    @Column(
        {
            type: DataType.STRING,
            allowNull: false,
        }
    )
    address: string;

    @Column(
        {
            type: DataType.TEXT,
            allowNull: false,
        }
    )
    aadhaar_image: string;

    @Column(
        {
            type: DataType.STRING,
            allowNull: false,
        }
    )
    aadhaar_no: string;

    @Column(
        {
            type: DataType.BOOLEAN,
            allowNull: true,
        }
    )
    is_verify: string;

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
