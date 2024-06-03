import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { db } from ".";

@Table(
    {
        tableName: 'payments',
        timestamps: false,
    }
)
export class Payment extends Model<Payment>{

    @Column(
        {
            type: DataType.ENUM('COD', 'ONLINE'),
            defaultValue: 'COD',
        }
    )
    type: string;

    @Column(
        {
            type: DataType.STRING,
            defaultValue: null,
        }
    )
    transaction_id: string;

    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    paymentIntent: string;

    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    client_secret: string;
    
    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    ephemeral_key: string;

    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    customer_id: string;

    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    refund_id: string;
    
    @Column(
        {
            type: DataType.FLOAT,
            allowNull: false,
        }
    )
    refund_amount: number;
    
    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    balance_transaction: string;
    
    @Column(
        {
            type: DataType.FLOAT,
            allowNull: false,
        }
    )
    amount: number;
    
    @Column(
        {
            type: DataType.TEXT,
            defaultValue: null,
        }
    )
    charge: string; 

    @Column(
        {
            type: DataType.ENUM('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'),
            defaultValue: 'PENDING',
        }
    )
    status: string;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
    
    @ForeignKey(() => db.Order)
    orderId: number;

    @ForeignKey(() => db.User)
    userId: number;
}