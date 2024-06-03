import algoliasearch from 'algoliasearch';
import { HttpStatus, Injectable } from "@nestjs/common";
import { Op } from "sequelize";

import { db } from "src/modules";
import { ResponseHandler } from "../common";
import { GetProdQueryDTO, SearchDTO } from "../dto";
import { ErrorCode, ErrorMessage } from "src/core/constants";
import { NumString, search, searchResult } from "../interfaces";
import { Product } from 'src/modules/product.entity';


@Injectable()
export class ProductHelper {

    constructor(private response: ResponseHandler) { }

    async GetPopularProds(): Promise<Array<any>> {
        try {
            const popular_prods = await db.Product.findAll(
                {
                    limit: 20,
                    order: [['order_count', 'DESC']],
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

            return popular_prods;
        } catch (error) {
            throw error;
        }
    }

    async GetProductById(pid: number): Promise<Product>{
        try {
            const product = await db.Product.findOne(
                {
                    where: {id:pid},
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

    async GetAllCategory(): Promise<Array<any>> {
        try {
            const categories = await db.Category.findAll(
                {
                    attributes: ['id', 'title', 'image', 'type', 'createdAt', 'updatedAt'],
                    include: {
                        model: db.SubCategory,
                        attributes: ['id', 'title', 'image', 'createdAt', 'updatedAt', 'categoryId']
                    }
                }
            );

            return categories;
        } catch (error) {
            throw error;
        }
    }

    async GetRecommendedProds(): Promise<Array<any>> {
        try {
            const recProds = await db.Product.findAll(
                {
                    limit: 20,
                    order: [['createdAt', 'DESC']],
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

            return recProds;
        } catch (error) {
            throw error;
        }
    }

    async GetProductsByFilter(Query: GetProdQueryDTO): Promise<Array<any>> {
        try {

            let condition: {
                id?: NumString,
                subCategoryId?: NumString,
                categoryId?: NumString,
            } = {};

            if (Query.productId) {
                condition = { id: Query.productId };
            } else if (Query.subCategoryId) {
                condition = { subCategoryId: Query.subCategoryId };
            } else if (Query.categoryId) {
                condition = { categoryId: Query.categoryId };
            } else {
                throw this.response.GenerateError(HttpStatus.INTERNAL_SERVER_ERROR, ErrorCode.ERR_INTERNAL_SERVER, ErrorMessage.ERROR_INTERNAL_SERVER, undefined);
            }

            const products = await db.Product.findAll(
                {
                    where: condition,
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
            return products;

        }
        catch (error) {
            throw error;
        }
    }

    async GetSearch(Query: SearchDTO): Promise<searchResult> {
        try {
            const term = Query.term;
            
            const categories = await db.Category.findAll(
                {
                    where: { title: { [Op.like]: '%' + term + '%' } },
                    attributes: ['id', 'title', 'image', 'type', 'createdAt', 'updatedAt'],
                    include: {
                        model: db.SubCategory,
                        attributes: ['id', 'title', 'image', 'createdAt', 'updatedAt', 'categoryId']
                    }
                }
            );
            const subCategories = await db.SubCategory.findAll(
                {
                    where: { title: { [Op.like]: '%' + term + '%' } },
                    attributes: ['id', 'title', 'image', 'createdAt', 'updatedAt', 'categoryId']
                }
            );
            const products = await db.Product.findAll(
                {
                    where: { name: { [Op.like]: '%' + term + '%' } },
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
            const total = categories.length + subCategories.length + products.length;

            const search: search = {
                categories: categories.length === 0 ? undefined : categories,
                subCategories: subCategories.length === 0 ? undefined : subCategories,
                products: products.length === 0 ? undefined : products,
                is_category: categories.length === 0 ? false : true,
                is_subCategory: subCategories.length === 0 ? false : true,
                is_product: products.length === 0 ? false : true
            }

            return { total, search };

        } catch (error) {
            throw error;
        }
    }

    async GetSearchV2(Query: SearchDTO) {
        try {
            const client = algoliasearch(process.env.ALGO_APPLICATION_ID, process.env.ALGO_SEARCH_ONLY_API_KEY);
            const index = client.initIndex("PRODUCT");

            let limit = Query.limit ? Query.limit : 20;
            let page = Query.page ? Query.page : 1;
            page != 0 ? page-- : page

            const result = await index.search(Query.term, { hitsPerPage: limit, page: page });

            if (result?.hits.length !== 0) {
                result.hits.forEach((element: any) => {
                    delete element.objectID;
                    delete element._highlightResult;
                });

                return { results: result.hits, totalPage: result.nbPages, limit: result.hitsPerPage, total: result.nbHits, hasMore: result.nbHits > Query.page * limit ? true : false };
            }
            return { result: [], totalPage: 0, limit: limit, total: 0, hasMore: false }
        } catch (error) {
            throw error;
        }
    }

    async GetProducts(ids: number[]) {
        return await db.Product.findAll(
            {
                where: { id: ids },
                order: [['order_count', 'DESC']],
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
    }
}