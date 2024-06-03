import { HttpStatus, Injectable } from "@nestjs/common";

import { ErrorCode, ErrorMessage } from "src/core/constants";
import { ResponseHandler } from "../common";
import { db } from "src/modules";
import { paginationDTO } from "../dto";
import { Product } from "src/modules/product.entity";

@Injectable()
export class ProductHelper {

    constructor(private rest: ResponseHandler) { }

    async createProduct(product: any){
        try {
            const newProduct = await db.Product.create(product);

            return newProduct;
        }
        catch (error) {
            throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_VALIDATION, error);
        }
    }

    async GetProducts(uid: number, query: paginationDTO): Promise<Product[]>{
        try {
            const {page = 1, limit = 10} = query;
            const offset = (page - 1) * limit;
                       
            const data = await db.Product.findAll(
                {
                    where: {userId: uid},  
                    attributes: ['id', 'name', 'description', 'additional_info', 'additional_details', 'rate_avg', 'rate_count', 'order_count', 'createdAt', 'updatedAt'],
                    include: [
                        {
                            model: db.ProdImage,
                            attributes: ['id', 'image', 'createdAt', 'updatedAt']
                        },
                        {
                            model: db.ProdColor,
                            attributes: ['id', 'color', 'createdAt', 'updatedAt']
                        },
                        {
                            model: db.ProdSize,
                            attributes: ['id', 'size', 'price', 'createdAt', 'updatedAt']
                        },
                        {
                            model: db.ProdSpec,
                            attributes: ['id', 'title', 'value', 'createdAt', 'updatedAt'],
                        }
                        
                    ],
                    limit,
                    offset,
                    order: ['id']
                }
            );

            const [results, metadata] = await db.Product.sequelize.query(`SELECT COUNT(*) as count FROM products WHERE userId=${uid}`);

            const count = results[0]['count'] || 0;

            const totalPages = Math.ceil(count / limit);
            
            const p : any = {
                products: data,
                pagination: {
                    totalItems: count,
                    currentPage: page,
                    pageSize: limit,
                    totalPages,
                }
            }
            return p;
        } catch (error) {
            throw error;
        }
    }
    

    async GetProductById(uid: number, pid: number): Promise<Product>{
        try {
            const product = await db.Product.findOne(
                {
                    where: {id:pid ,userId: uid},
                    attributes: ['id', 'name', 'description', 'additional_info', 'additional_details', 'rate_avg', 'rate_count', 'order_count', 'createdAt', 'updatedAt'],
                    include: [
                        {
                            model: db.ProdImage,
                            attributes: ['id', 'image', 'createdAt', 'updatedAt']
                        },
                        {
                            model: db.ProdColor,
                            attributes: ['id', 'color', 'createdAt', 'updatedAt']
                        },
                        {
                            model: db.ProdSize,
                            attributes: ['id', 'size', 'price', 'createdAt', 'updatedAt']
                        },
                        {
                            model: db.ProdSpec,
                            attributes: ['id', 'title', 'value', 'createdAt', 'updatedAt']
                        }
                    ]
                }
            );

            return product;
        } catch (error) {
            throw error;
        }
    }


    async getDataToUpdate(ReqBody: any, productId: number, productDetails: any){
        const fieldToUpdate: any[] = [];
        const fieldToCreate: any[] = [];
        const updateDataIds = [];
    
        ReqBody.forEach(data => {
            
            if(data.id){
                updateDataIds.push(data.id)                    
                fieldToUpdate.push(data);
            }
            else{
                fieldToCreate.push({...data, productId: productId});
            }
        });
    
        const removeDataIds = productDetails
            .filter((data) => !updateDataIds.includes(data.id))
            .map(data => data.id);
    

        return {fieldToCreate, fieldToUpdate, removeDataIds}
        
    }


    async DeleteImageByIds(imgId: number[], pid: number){
        try {
            const image = await db.ProdImage.destroy({
                where: {id: imgId, productId: pid},
            })
            return image;

        } catch (error) {
            throw error;
        }
    }

    async DeleteSpecByIds(sid: number[], pid: number){
        try {
            const image = await db.ProdSpec.destroy({
                where: {id: sid, productId: pid},
            })
            return image;

        } catch (error) {
            throw error;
        }
    }
    
    async DeleteSizeByIds(sid: number[], pid: number){
        try {
            const image = await db.ProdSize.destroy({
                where: {id: sid, productId: pid},
            })
            return image;

        } catch (error) {
            throw error;
        }
    }

    async DeleteColorByIds(cid: number[], pid: number){
        try {
            const image = await db.ProdColor.destroy({
                where: {id: cid, productId: pid},
            })
            return image;

        } catch (error) {
            throw error;
        }
    }
}