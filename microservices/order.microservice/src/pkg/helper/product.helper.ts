import { db } from "src/modules";
import { ResponseHandler } from "../common";

export class ProductHelper {
    constructor(
        private rest: ResponseHandler,
    ) { }

    async GetProductById(productId: number) {
        try {
            return await db.Product.findOne({ where: {id : productId }, attributes: prod_attributes })
        } catch (error) {
            throw error;
        }
    }
}

const prod_attributes = [
    'id',
    'rate_avg', 
    'rate_count'
];