import { HttpStatus, Injectable } from "@nestjs/common";

import { db } from "src/modules";
import { ResponseHandler } from "../common";
import { ErrorCode } from "src/core/constants";
import { filter } from "../interfaces";
import { ApplyFilterDTO } from "../dto";
import { ProductHelper } from "./product.helper";
import { Op } from "sequelize";


@Injectable()
export class FilterHelper {

    constructor(
        private rest: ResponseHandler,
        private product: ProductHelper,
    ) { }

    async GetFilter(filter: filter, search: string) {
        try {
            let cat: any;
            const query: string = (filter.is_category || filter.is_subCategory) ? (filter.is_category ? "is_category" : "is_subCategory") : "is_product";

            // filter category ...
            switch (query) {
                case "is_category": {
                    cat = await db.Category.findOne({ where: { title: { [Op.like]: '%' + search + '%' } }, attributes: ['title', 'type'] });
                    break;
                }
                case "is_subCategory": {
                    const sub_cat = await db.SubCategory.findOne({ where: { title: { [Op.like]: '%' + search + '%' } }, attributes: ['categoryId'] });
                    if (!sub_cat) throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, `No sub_category found for search: ${search}`, undefined);

                    cat = await db.Category.findOne({ where: { id: sub_cat.categoryId }, attributes: ['title', 'type'] });
                    break;
                }
                default: {
                    const product = await db.Product.findOne({ where: { name: { [Op.like]: '%' + search + '%' } }, attributes: ['categoryId'] });
                    if (!product) throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, `No product found for search: ${search}`, undefined);

                    cat = await db.Category.findOne({ where: { id: product.categoryId }, attributes: ['title', 'type'] });
                    break;
                }
            }
            if (!cat) throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, `No category found for search: ${search}`, undefined);

            // categories ...
            const category = await db.Category.findAll({ where: { type: cat.type }, attributes: ['id', 'title', 'type'] });
            const categories = [...new Set(category.map(element => element.title))];

            const cat_ids = [...new Set(category.map(element => element.id))];

            // subCategories ...
            const subCategory = await db.SubCategory.findAll({ where: { categoryId: cat_ids }, attributes: ['title'] });
            const subCategories = [...new Set(subCategory.map(element => element.title))];

            // products ...
            const product = await db.Product.findAll({ where: { categoryId: cat_ids }, attributes: ['id'] });
            const prod = [...new Set(product.map(element => element.id))];

            // colors ...
            const color = await db.ProdColor.findAll({ where: { productId: prod }, attributes: ['color'] });
            const colors = [...new Set(color.map(element => element.color))];

            // sizes ...
            const size = await db.ProdSize.findAll({ where: { productId: prod }, attributes: ['size'] });
            const sizes = [...new Set(size.map(element => element.size))];

            // types ...
            const type = await db.ProdSpec.findAll({ where: { productId: prod }, attributes: ['title'] });
            const types: any = [...new Set(type.map(element => element.title))];

            const filters = {
                category: categories.length === 0 ? undefined : categories,
                sub_category: subCategories.length === 0 ? undefined : subCategories,
                color: colors.length === 0 ? undefined : colors,
                size: sizes.length === 0 ? undefined : sizes,
                prod,
                other_spec: undefined
            }

            // additional specifications ...
            let other_spec = {};
            for (let i = 0; i < types.length; i++) {
                const value = await db.ProdSpec.findAll(
                    {
                        where: { productId: prod, title: types[i] },
                        attributes: ['value']
                    }
                );
                const values = [...new Set(value.map(element => element.value))];
                // filters[types[i]]   = values;
                other_spec[types[i]] = values;
            }
            filters.other_spec = other_spec;

            return filters;
        }
        catch (error) {
            throw error;
        }
    }

    async ApplyFilter(ReqBody: ApplyFilterDTO) {
        try {
            const filters = Object.keys(ReqBody.filter), prod = ReqBody.prod_ids, filter: any = ReqBody.filter;
            let products: any[] = [], i = 0, ids = prod, hasMore = true;

            while (hasMore) {
                if(ids.length === 0) {
                    break;   
                }
                switch (filters[i]) {
                    case "category": {
                        const catId = await db.Category.findAll({ where: { title: filter.category }, attributes: ['id'] });
                        const catIds = [...new Set(catId.map(element => element.id))];
                        if (catIds.length === 0) {
                            hasMore = false;
                            break;
                        }

                        const prodId = await db.Product.findAll({ where: { id: ids, categoryId: catIds }, attributes: ['id'] });
                        const prodIds: any = [...new Set(prodId.map(element => element.id))];
                        if (filters.length === i + 1) {
                            products = await this.product.GetProducts(prodIds);
                            hasMore = false;
                            break;
                        }
                        else {
                            ids = prodIds
                            i++;
                        }
                        break;
                    }
                    case "sub_category": {
                        const subCatId = await db.SubCategory.findAll({ where: { title: filter.sub_category }, attributes: ['id'] });
                        const subCatIds = [...new Set(subCatId.map(element => element.id))];
                        if (subCatIds.length === 0) {
                            hasMore = false;
                            break;
                        }

                        const prodId = await db.Product.findAll({ where: { id: ids, subCategoryId: subCatIds }, attributes: ['id'] });
                        const prodIds: any = [...new Set(prodId.map(element => element.id))];
                        if (filters.length === i + 1) {
                            products = await this.product.GetProducts(prodIds);
                            hasMore = false;
                            break;
                        }
                        else {
                            ids = prodIds
                            i++;
                        }
                        break;
                    }
                    case "color": {
                        const prodId = await db.ProdColor.findAll({ where: { productId: ids, color: filter.color }, attributes: ['productId'] });
                        const prodIds: any = [...new Set(prodId.map(element => element.productId))];
                        if (prodIds.length === 0) {
                            hasMore = false;
                            break;
                        }

                        if (filters.length === i + 1) {
                            products = await this.product.GetProducts(prodIds);
                            hasMore = false;
                            break;
                        }
                        else {
                            ids = prodIds
                            i++;
                        }
                        break;
                    }
                    case "size": {
                        const prodId = await db.ProdSize.findAll({ where: { productId: ids, size: filter.size }, attributes: ['productId'] });
                        const prodIds: any = [...new Set(prodId.map(element => element.productId))];
                        if (prodIds.length === 0) {
                            hasMore = false;
                            break;
                        }

                        if (filters.length === i + 1) {
                            products = await this.product.GetProducts(prodIds);
                            hasMore = false;
                            break;
                        }
                        else {
                            ids = prodIds
                            i++;
                        }
                        break;
                    }
                    case "other_spec": {
                        const other_spec = Object.keys(filter.other_spec)
                        let prodId = [];
                        for (let ix = 0; ix < other_spec.length; ix++) {
                            const pid = await db.ProdSpec.findAll({ where: { productId: ids, title: other_spec[ix], value: filter.other_spec[other_spec[ix]][0] }, attributes: ['productId'] });
                            const pids = [...new Set(pid.map(element => element.productId))];

                            prodId = [...prodId, ...pids]
                        }
                        const prodIds = [...new Set(prodId.map(element => element))];
                        if (prodIds.length === 0) {
                            hasMore = false;
                            break;
                        }

                        if (filters.length === i + 1) {
                            products = await this.product.GetProducts(prodIds);
                            hasMore = false;
                            break;
                        }
                        else {
                            ids = prodIds
                            i++;
                        }
                        break;
                    }
                }
            }
            return products;
        } catch (error) {
            throw error
        }
    }
}