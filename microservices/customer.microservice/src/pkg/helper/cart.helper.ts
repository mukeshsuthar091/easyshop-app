import { Injectable } from "@nestjs/common";
import { Model, where } from "sequelize";
import { db } from "src/modules";
import { CartDTO } from "../dto";
import { Cart } from "src/modules/cart.entity";


@Injectable()
export class CartHelper {

    async GetCartItems(uid: number): Promise<Cart[]>{
        try {
            
            const data: any = await db.Cart.findAll({
                where: { userId: uid },
                attributes: ['id', 'status', 'quantity', 'userId', 'b_userId', 'createdAt', 'updatedAt'],
                include: [
                    {
                      model: db.Product,
                      attributes: ['id', 'name', 'description', 'additional_info', 'additional_details'],
                      include: [
                        {
                            model: db.ProdImage,
                            attributes: ['id', 'image',],
                        }
                      ]
                    },
                    {
                      model: db.ProdSize,
                      attributes: ['id', 'size', 'price'],
                    },
                    {
                      model: db.ProdColor,
                      attributes: ['id', 'color'],
                    },
                ],
            })

            return data;

        } catch (error) {
            throw error;
        }
    }

    async GetCartItem(cid: number, uid: number): Promise<Cart>{
        try {
            
            const data: any = await db.Cart.findOne({
                where: { id: cid, userId: uid }                
            })

            return data;

        } catch (error) {
            throw error;
        }
    }

    async UpdateCartItem(cartItem: CartDTO, cid:number, uid: number){
        try {
            return await db.Cart.update(cartItem, { 
                where: { id: cid, userId: uid } 
            })

        } catch (error) {
            throw error;
        }
    }

    async AddItemInCart(cartItem: any){
        try {
            return await db.Cart.create(cartItem);
        } catch (error) {
            throw error;
        }
    }
}