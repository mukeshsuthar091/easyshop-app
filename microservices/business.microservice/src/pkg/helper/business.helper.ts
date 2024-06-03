import { HttpStatus, Injectable } from "@nestjs/common";

import { ErrorCode, ErrorMessage } from "src/core/constants";
import { User } from "src/modules/user.entity";
import { ResponseHandler } from "../common";
import { db } from "src/modules";
import { category, subCategory } from "../interfaces/business.interface";
import { Category } from "src/modules/category.entity";
import { Product } from "src/modules/product.entity";
import { SubCategory } from "src/modules/sub_category.entity";
import { paginationDTO } from "../dto";


@Injectable()
export class BusinessHelper {

    constructor(private rest: ResponseHandler) { }

    async GetCategoryById(uid: number, cid: number): Promise<Category>{
        try {
                const category = await db.Category.findOne({where: {id: cid, userId: uid}});
                return category;
            } catch (error) {
                throw error;
            }
        }

    
    async GetCategories(userId: number, query: paginationDTO): Promise<Category[]> {
        try {
            const {page = 1, limit = 10} = query;
            const offset = (page - 1) * limit;

            const data = await db.Category.findAndCountAll({
                where: { userId },
                limit: limit,
                offset: offset
            });

            const totalPages = Math.ceil(data.count / limit);
            
            const c : any = {
                categories: data.rows,
                pagination: {
                    totalItems: data.count,
                    currentPage: page,
                    pageSize: limit,
                    totalPages,
                }
            }

            return c;
        } catch (error) {
            throw error;
        }
    }

    async CreateCategory(category: any): Promise<Category> {
        try {
            const newCategory = await db.Category.create(category);

            return newCategory;
        }
        catch (error) {
            throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_VALIDATION, error);
        }
    }

    async UpdateCategory({ c, cid, uid }: { c: category, cid: number, uid: number }) {
        try {
            return await db.Category.update(c, { where: { id: cid, userId: uid } })
        } catch (error) {
            throw error;
        }
    }

    async GetSubCategoryById(uid: number, scid: number): Promise<SubCategory>{
        try {
            const subCategory = await db.SubCategory.findOne({where: {id: scid, userId: uid}});
            return subCategory;
        } catch (error) {
            throw error;
        }
    }

    async GetSubCategories(userId: number, query: paginationDTO): Promise<SubCategory[]> {
        try {
            const {page = 1, limit = 10} = query;
            const offset = (page - 1) * limit;

            const data = await db.SubCategory.findAndCountAll({
                where: { userId },
                limit,
                offset,
            });
            
            const totalPages = Math.ceil(data.count / limit);
            
            const sc : any = {
                subCategories: data.rows,
                pagination: {
                    totalItems: data.count,
                    currentPage: page,
                    pageSize: limit,
                    totalPages,
                }
            }

            return sc;

        } catch (error) {
            throw error;
        }
    }

    async CreateSubCategory(subCategory: any): Promise<SubCategory> {
        try {
            const newSubCategory = await db.SubCategory.create(subCategory);

            return newSubCategory;
        }
        catch (error) {
            throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_VALIDATION, error);
        }
    }


    async UpdateSubCategory({ sc, scid, uid }: { sc: subCategory, scid: number, uid: number }) {
        try {
            return await db.SubCategory.update(sc, { 
                where: { id: scid, userId: uid } 
            })

        } catch (error) {
            throw error;
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