import { HttpStatus, Injectable } from "@nestjs/common";

import { ErrorCode, ErrorMessage } from "src/core/constants";
import { ResponseHandler } from "../common";
import { db } from "src/modules";
import { category } from "../interfaces/business.interface";
import { Category } from "src/modules/category.entity";
import { paginationDTO } from "../dto";


@Injectable()
export class CategoryHelper {

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

}