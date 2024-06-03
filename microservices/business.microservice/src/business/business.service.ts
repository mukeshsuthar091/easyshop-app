import { HttpStatus, Injectable, Req } from "@nestjs/common";
import { Response, response } from "express";

import { ResponseHandler } from "src/pkg/common";
import { ErrorCode, ErrorMessage, SuccessMessage } from "src/core/constants";
import { db } from "src/modules";
import { CategoryDTO, SubCategoryDTO, UpdateCategoryDTO, UpdateSubCategoryDTO, paginationDTO } from "src/pkg/dto/business.dto";
import { BannerHelper, CategoryHelper, ProductHelper, SubCategoryHelper } from "src/pkg/helper";
import { DeleteImage } from "src/pkg/cloudinary";
import { ProductDTO, UpdateProductDTO } from "src/pkg/dto";
import { Product } from "src/modules/product.entity";
import { BannerDTO } from "src/pkg/dto/banner.dto";

@Injectable()
export class BusinessService {

    constructor(
        private banner: BannerHelper,
        private category: CategoryHelper,
        private subCategory: SubCategoryHelper,
        private product: ProductHelper,
        private rest: ResponseHandler
    ){}

    async GetCategories(uid: number, query:paginationDTO, Response: Response){
        try {
            const data: any = await this.category.GetCategories(uid, query);
            if (data.categories.length <= 0) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Categories not found!", undefined);
          
            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.OK,
                SuccessMessage.GET_CATEGORY_SUCCEED,
                data
            );

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }


    async GetCategory(uid: number, cid: number, Response: Response){
        try {

            const category: any = await this.category.GetCategoryById(uid, cid);
            if (!category) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Category not found!", undefined);
            
            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.OK,
                SuccessMessage.GET_SINGLE_CATEGORY_SUCCEED,
                category
            );
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async CreateCategory(uid: number, ReqBody: CategoryDTO, Response: Response): Promise<Response<any, Record<string, any>>> {
        try {
            
            const data = {
                ...ReqBody,
                userId: uid,
            }

            const category = await this.category.CreateCategory(data);

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.CREATED,
                SuccessMessage.CREATE_CATEGORY_SUCCEED,
                category
            );

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }

    }

    async UpdateCategory(uid: number, cid: number, ReqBody: UpdateCategoryDTO, Response: Response): Promise<Response<any, Record<string, any>>> {
        try {
            
            const category: any = await this.category.GetCategoryById(uid, cid);
            if (!category) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Category not found!", undefined);

            if (ReqBody.image) {
                await DeleteImage([category.image]);
            }

            const new_category_data = {
                title:  ReqBody.title ? ReqBody.title : category.title,
                type:   ReqBody.type ? ReqBody.type : category.type,
                image:  ReqBody.image ? ReqBody.image : category.image,
            }

            await this.category.UpdateCategory({c: new_category_data, cid: cid, uid: uid});

            const updatedCategory: any = await this.category.GetCategoryById(uid, cid);
            
            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.OK,
                SuccessMessage.UPDATE_CATEGORY_SUCCEED,
                updatedCategory
            );

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }

    }

    async DeleteCategory(uid: number, cid: number, Response: Response){
        try {
            const category: any = await this.category.GetCategoryById(uid, cid);
            if (!category) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Category not found!", undefined);

            if(category.image){
                await DeleteImage([category.image])
            }

            await category.destroy();

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.OK,
                SuccessMessage.DELETE_CATEGORY_SUCCEED,
                undefined
            );

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }        
    }


    async GetSubCategories(uid: number, query:paginationDTO, Response: Response){
        try {
            
            const data: any = await this.subCategory.GetSubCategories(uid, query);
            if (data.subCategories.length <= 0) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Sub-Categories not found!", undefined);

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.OK,
                SuccessMessage.GET_SUB_CATEGORY_SUCCEED,
                data
            );

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GetSubCategory(uid: number, scid: number, Response: Response){
        try {

            const subCategory: any = await this.subCategory.GetSubCategoryById(uid, scid);
            if (!subCategory) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Sub-Category not found!", undefined);
            
            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.OK,
                SuccessMessage.GET_SINGLE_SUB_CATEGORY_SUCCEED,
                subCategory
            );
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }


    async CreateSubCategory(uid: number, cid: number, ReqBody: SubCategoryDTO, Response: Response): Promise<Response<any, Record<string, any>>> {
        try {
            
            const data = {
                ...ReqBody,
                categoryId: +cid,
                userId: uid,
            }

            const subCategory = await this.subCategory.CreateSubCategory(data);

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.CREATED,
                SuccessMessage.CREATE_SUB_CATEGORY_SUCCEED,
                subCategory
            );

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }

    }

    async UpdateSubCategory(uid: number, scid: number, ReqBody: UpdateSubCategoryDTO, Response: Response): Promise<Response<any, Record<string, any>>> {
        try {
            
            const subCategory: any = await this.subCategory.GetSubCategoryById(uid, scid);
            if (!subCategory) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Sub-Category not found!", undefined);

            if (ReqBody.image) {
                await DeleteImage([subCategory.image]);
            }

            const new_category_data = {
                title: ReqBody.title ? ReqBody.title : subCategory.title,
                image: ReqBody.image ? ReqBody.image : subCategory.image,
            }

            await this.subCategory.UpdateSubCategory({sc: new_category_data, scid: scid, uid: uid});

            const updatedSubCategory: any = await this.subCategory.GetSubCategoryById(uid, scid);
            
            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.OK,
                SuccessMessage.UPDATE_SUB_CATEGORY_SUCCEED,
                updatedSubCategory
            );

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }

    }

    async DeleteSubCategory(uid: number, scid: number, Response: Response){
        try {
            const subCategory: any = await this.subCategory.GetSubCategoryById(uid, scid);
            if (!subCategory) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Sub-Category not found!", undefined);

            if(subCategory.image){
                await DeleteImage([subCategory.image])
            }
            await subCategory.destroy();

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.OK,
                SuccessMessage.DELETE_SUB_CATEGORY_SUCCEED,
                undefined
            );

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }        
    }


    async GetProducts(uid: number, query:paginationDTO, Response: Response) {
        try {
            
            const data: any = await this.product.GetProducts(uid, query);
            if (data.products.length <= 0) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Products not found!", undefined);

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.OK,
                SuccessMessage.GET_PRODUCTS_SUCCEED,
                data
            );

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GetProduct(uid: number, pid: number, Response: Response) {
        try {
            
            const product = await this.product.GetProductById(uid, pid);
            if (!product) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Product not found!", undefined);

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.OK,
                SuccessMessage.GET_PRODUCT_SUCCEED,
                product
            );

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }


    async CreateProduct(uid: number, ReqBody: ProductDTO, Response: Response){
        try {

            console.log(ReqBody);
            
            const product_details: any = {
                name:               ReqBody.name,
                description:        ReqBody.description,
                additional_info:    ReqBody.additional_info,
                additional_details: ReqBody.additional_details,
                userId:             uid,
                categoryId:         +ReqBody.categoryId,
                subCategoryId:      +ReqBody.subCategoryId
            }

            const product = await this.product.createProduct(product_details);

            let image: any =   ReqBody.images;
            let size:  any =   ReqBody.product_sizes;
            let color: any =   ReqBody.product_colors;
            let spec:  any =   ReqBody.specifications;

            for (let i = 0; i < image.length; i++) {
                image[i] = {
                    image: image[i], 
                    productId: product.id
                };
            }
            for (let i = 0; i < size.length; i++) {
                size[i].productId = product.id;
            }
            for (let i = 0; i < spec.length; i++) {
                spec[i].productId = product.id;
            }
            for (let i = 0; i < color.length; i++) {
                color[i] = {
                    color: color[i],
                    productId: product.id
                }
            }

            console.log(image, size, spec, color);

            const images    = await db.ProdImage.bulkCreate(image);
            const sizes     = await db.ProdSize.bulkCreate(size);
            const specs     = await db.ProdSpec.bulkCreate(spec);
            const colors    = await db.ProdColor.bulkCreate(color);

            const updateProduct: any = await this.product.GetProductById(uid, product.id);

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.CREATED,
                SuccessMessage.CREATE_PRODUCT_SUCCEED,
                updateProduct
            );
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async UpdateProduct(uid: number, pid: number, ReqBody: UpdateProductDTO, Response: Response){
        try {

            const product: any = await this.product.GetProductById(uid, pid);
            if (!product) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Product not found!", undefined);

            
            const product_details: any = {
                name:               ReqBody.name ? ReqBody.name : product.name,
                description:        ReqBody.description ? ReqBody.description : product.description,
                additional_info:    ReqBody.additional_info ? ReqBody.additional_info : product.additional_info,
                additional_details: ReqBody.additional_details ? ReqBody.additional_details: product.additional_details,
                categoryId:         +ReqBody.categoryId ? ReqBody.categoryId : product.categoryId,
                subCategoryId:      +ReqBody.subCategoryId ? ReqBody.subCategoryId : product.subCategoryId,
            }
       
            await db.Product.update(product_details, { 
                where: { id: product.id, userId: uid } 
            })


            if(ReqBody.images && ReqBody.images.length > 0){
                const ids = ReqBody.images.filter(img => typeof img === 'number');
                const urls = ReqBody.images.filter(img => typeof img === 'string');
                const newImages: any = urls.map(img => ({
                    image: img,
                    productId: product.id
                }));

                const removeImages = product.ProdImages.filter(item => !ids.includes(item.id));
                const imageUrls = removeImages.map(img => img.image)
                const imageIds = removeImages.map(img => img.id)
                
                if(imageUrls.length > 0) {
                    await DeleteImage(imageUrls)
                }
                
                await this.product.DeleteImageByIds(imageIds, product.id);

                await db.ProdImage.bulkCreate(newImages);
                
            }

            if(ReqBody.specifications && ReqBody.specifications.length > 0) {

                const data = await this.product.getDataToUpdate(ReqBody.specifications, product.id, product.ProdSpecs);

                const {fieldToUpdate, fieldToCreate} = data;
                const removeSpecIds = data.removeDataIds;

                await this.product.DeleteSpecByIds(removeSpecIds, product.id);

                await db.ProdSpec.bulkCreate(fieldToUpdate, {
                    updateOnDuplicate: ['title', 'value']
                });
                
                await db.ProdSpec.bulkCreate(fieldToCreate);  

            }

            if(ReqBody.product_sizes && ReqBody.product_sizes.length > 0) {

                const data = await this.product.getDataToUpdate(ReqBody.product_sizes, product.id, product.ProdSizes);

                const {fieldToUpdate, fieldToCreate} = data;
                const removeSizeIds = data.removeDataIds;

                await this.product.DeleteSizeByIds(removeSizeIds, product.id);

                await db.ProdSize.bulkCreate(fieldToUpdate, {
                    updateOnDuplicate: ['size', 'price']
                });
                
                await db.ProdSize.bulkCreate(fieldToCreate);
            }

            
            if(ReqBody.product_colors && ReqBody.product_colors.length > 0) {

                const data = await this.product.getDataToUpdate(ReqBody.product_colors, product.id, product.ProdColors);

                const {fieldToUpdate, fieldToCreate} = data;
                const removeColorIds = data.removeDataIds;

                await this.product.DeleteColorByIds(removeColorIds, product.id);

                await db.ProdColor.bulkCreate(fieldToUpdate, {
                    updateOnDuplicate: ['color']
                });
                
                await db.ProdColor.bulkCreate(fieldToCreate);
            }

            const updateProduct: any = await this.product.GetProductById(uid, product.id);
        
            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.OK,
                SuccessMessage.UPDATE_PRODUCT_SUCCEED,
                updateProduct,
            );
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }


    async DeleteProduct(uid: number, pid: number, Response: Response){
        try {
            const product: any = await this.product.GetProductById(uid, pid);
            if (!product) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Product not found!", undefined);

            if(product.ProdImages.length > 0) {
                let images = product.ProdImages.map((img: { image: any; }) => {
                    return img.image;
                });
                await DeleteImage(images)
            }

            await Product.destroy({
                where: {id: pid},
            });

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.OK,
                SuccessMessage.DELETE_PRODUCT_SUCCEED,
                undefined
            );

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }        
    }


    // ------------- Testing Banner -----------

    async CreateBanner(uid: number, ReqBody: BannerDTO, Response: Response){
        try {
            
            const banner: any = await this.banner.CreateBanner(ReqBody)

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.CREATED,
                SuccessMessage.CREATE_BANNER_SUCCEED,
                banner
            );
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }


    async GetBanner(Response: Response){
        try {
            const banners: Array<any> = await this.banner.GetBanners();
            if (!banners) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Banners not found!", undefined);

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.CREATED,
                "Successfully fetched banners.",
                banners
            );
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

}