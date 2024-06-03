import { db } from "src/modules";
import { ResponseHandler } from "../common";
import { Order } from "src/modules/order.entity";
import { GetOrderDTO } from "../dto";

export class OrderHelper {
    constructor(
        private rest: ResponseHandler,
    ) { }

    async GetOrderProduct(orderId: number, productId: number) {
        try {
            return await db.OrderProd.findOne({ where: { orderId, productId }, attributes: order_prod_attributes })
        } catch (error) {
            throw error;
        }
    }

    async GetOrderByStatus(ReqQue: GetOrderDTO, uid: number, role: number) {
        try {
            let status = ReqQue.status;
            let page = +ReqQue.page || 1;
            let limit = +ReqQue.limit || 10;
            
            const offset = (page - 1) * limit;

            let ostatus: Array<string> = [];
            switch (status) {
                case "current": {
                    ostatus = ['PENDING', 'ORDERED', 'PACKED', 'SHIPPED', 'DELIVERED', 'ACCEPTED'];
                    break;
                }
                default: {
                    ostatus = ['CANCELLED', 'PARTIAL_RETURN_REQUESTED', 'RETURN_REQUESTED', 'PARTIAL_RETURNED', 'RETURNED', 'REJECTED'];
                    break;
                }
            }
            
            let data;
            let result;
            if(role == 1){
                data = await db.Order.findAll({
                    where: { userId: uid, status: ostatus },
                    include: {
                        model: db.OrderProd,
                        include: order_prod_includes
                    },
                    limit,
                    offset
                });

                result = await db.Product.sequelize.query(`SELECT COUNT(*) as count FROM orders WHERE userId=${uid}`);
            }
            else if(role == 2){
                data = await db.Order.findAll({
                    where: { b_userId: uid, status: ostatus },
                    include: {
                        model: db.OrderProd,
                        include: order_prod_includes
                    },
                    limit,
                    offset
                });

                result = await db.Product.sequelize.query(`SELECT COUNT(*) as count FROM orders WHERE b_userId=${uid}`);
            }

            const [results, metadata] = result;
            const count = results[0]['count'] || 0;

            const totalPages = Math.ceil(count / limit);
            
            const orders : any = {
                orders: data,
                pagination: {
                    totalItems: count,
                    currentPage: page,
                    pageSize: limit,
                    totalPages,
                }
            }

            return orders;
        } catch (error) {
            throw error;
        }
    }

    async GetOrderWithPaymentDetails(orderId: number){
        try {
            return await db.Order.findOne({ 
                where: { id: orderId },
                attributes: order_attributes,
                include: {
                    model: db.Payment,
                    attributes: payment_attributes
                }
            })
        }catch(error){
            throw error;
        }
    }
}

// order_prod_includes ...
const order_prod_includes = [
    { model: db.Product, as: 'product', include: [{ 
        model: db.ProdImage }
    ]},
    { model: db.ProdSize, as: 'product_size' },
    { model: db.ProdColor, as: 'product_color' },
];

// order_prod_attributes ...
const order_prod_attributes = [
    'id',
    'quantity',
    'rate',
    'rate_description',
    'createdAt',
    'updatedAt'
]


const order_attributes = [ 
    'id', 
    'payment_method', 
    'promo_discount', 
    'delivery_charge', 
    'sub_total', 
    'total_amount', 
    'status', 
    'cancellation_reason',
    'return_reason',
    'couponId',
    'createdAt',
    'updatedAt'
]

const payment_attributes = [ 
    'id',
    'transaction_id',
    'paymentIntent',
    'client_secret',
    'ephemeral_key',
    'customer_id',
    'amount',
    'status',
    'createdAt',
    'updatedAt'
]