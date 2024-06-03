import { HttpStatus, Injectable } from "@nestjs/common";

import { ErrorCode, ErrorMessage } from "src/core/constants";
import { ResponseHandler } from "../common";
import { db } from "src/modules";
import { subCategory } from "../interfaces/business.interface";
import { SubCategory } from "src/modules/sub_category.entity";
import { paginationDTO } from "../dto";


@Injectable()
export class SubCategoryHelper {

    constructor(private rest: ResponseHandler) { }

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

}