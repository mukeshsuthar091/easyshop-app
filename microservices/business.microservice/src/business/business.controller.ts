import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { Response } from "express";
import { UserClaims } from "src/core/decorator";
import { ApiTags, ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";

import { claims } from "src/pkg/interfaces";
import { BusinessService } from "./business.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { CategoryDTO, SubCategoryDTO, UpdateCategoryDTO, UpdateSubCategoryDTO, paginationDTO } from "src/pkg/dto/business.dto";
import { ProductDTO, UpdateProductDTO } from "src/pkg/dto";
import { BannerDTO } from "src/pkg/dto/banner.dto";


@Controller('business')
@ApiTags('Business Module')
@ApiBearerAuth('access-token')

export class BusinessController {
    
    constructor(private shopService: BusinessService) {}

    
    // ------------------ category section ------------------------

    @Get("/all-categories")
    GetCategories(
        @UserClaims() claims: claims,
        @Query() query: paginationDTO,
        @Res() Response: Response
    ){
        return this.shopService.GetCategories(claims.userId, query, Response)   
    }

    @Get("/category/:categoryId")
    GetCategory(
        @Param('categoryId') cid: number,
        @UserClaims() claims: claims,
        @Res() Response: Response
    ){
        return this.shopService.GetCategory(claims.userId, cid, Response)   
    }


    @Post('/create-category')
    CreateCategory(
        @UserClaims() claims: claims,
        @Body() ReqBody: CategoryDTO,
        @Res() Response: Response
    ){
        return this.shopService.CreateCategory(claims.userId, ReqBody, Response)   
    }


    @Put('/category/:categoryId')
    UpdateCategory(
        @UserClaims() claims: claims,
        @Param('categoryId') cid: number,
        @Body() ReqBody: UpdateCategoryDTO,
        @Res() Response: Response
    ){
        return this.shopService.UpdateCategory(claims.userId, cid, ReqBody, Response)   
    }


    @Delete("/category/:categoryId")
    DeleteCategory(
        @Param('categoryId') cid: number,
        @UserClaims() claims: claims,
        @Res() Response: Response
    ){
        return this.shopService.DeleteCategory(claims.userId, cid, Response)   
    }


    // ------------------ sub-category section ------------------------
    @Get("/all-subCategories")
    GetSubCategories(
        @UserClaims() claims: claims,
        @Query() query: paginationDTO,
        @Res() Response: Response
    ){
        return this.shopService.GetSubCategories(claims.userId, query ,Response)   
    }

    @Get("/subcategory/:subCategoryId")
    GetSubCategory(
        @Param('subCategoryId') scid: number,
        @UserClaims() claims: claims,
        @Res() Response: Response
    ){
        return this.shopService.GetSubCategory(claims.userId, scid, Response)   
    }

    @Post('/:catererId/create-subcategory')
    CreateSubCategory(
        @UserClaims() claims: claims,
        @Param('catererId') cid: number,
        @Body() ReqBody: SubCategoryDTO,
        @Res() Response: Response
    ){
        return this.shopService.CreateSubCategory(claims.userId, cid, ReqBody, Response)   
    }


    @Put('/subCategory/:subCategoryId')
    UpdateSubCategory(
        @UserClaims() claims: claims,
        @Param('subCategoryId') scid: number,
        @Body() ReqBody: UpdateSubCategoryDTO,
        @Res() Response: Response
    ){
        return this.shopService.UpdateSubCategory(claims.userId, scid, ReqBody, Response)   
    }

    @Delete("/subCategory/:subCategoryId")
    DeleteSubCategory(
        @Param('subCategoryId') scid: number,
        @UserClaims() claims: claims,
        @Res() Response: Response
    ){
        return this.shopService.DeleteSubCategory(claims.userId, scid, Response)   
    }
    

    // ------------------ product section ------------------------

    @Get("/all-products")
    GetProducts(
        @UserClaims() claims: claims,
        @Query() query: paginationDTO,
        @Res() Response: Response
    ){
        return this.shopService.GetProducts(claims.userId, query ,Response)   
    }
    
    @Get("/product/:productId")
    GetProduct(
        @UserClaims() claims: claims,
        @Param('productId') pid: number,
        @Res() Response: Response
    ){
        return this.shopService.GetProduct(claims.userId , pid, Response)   
    } 

    @Post('/create-product')
    CreateProduct(
        @UserClaims() claims: claims,
        @Body() ReqBody: ProductDTO,
        @Res() Response: Response
    ){
        return this.shopService.CreateProduct(claims.userId, ReqBody, Response)   
    }


    @Put('/product/:productId')
    UpdateProduct(
        @UserClaims() claims: claims,
        @Param('productId') pid: number,
        @Body() ReqBody: UpdateProductDTO,
        @Res() Response: Response
    ){
        return this.shopService.UpdateProduct(claims.userId, pid, ReqBody, Response)   
    }

    @Delete("/product/:productId")
    DeleteProduct(
        @Param('productId') pid: number,
        @UserClaims() claims: claims,
        @Res() Response: Response
    ){
        return this.shopService.DeleteProduct(claims.userId, pid, Response)   
    }


    // ------------- Testing Banner-----------

    @Post('/banner')
    CreateBanner(
        @UserClaims() claims: claims,
        @Body() ReqBody: BannerDTO,
        @Res() Response: Response
    ){
        return this.shopService.CreateBanner(claims.userId, ReqBody, Response)   
    }

    @Get('/banners')
    GetBanner(
        @Res() Response: Response
    ){
        return this.shopService.GetBanner(Response)   
    }

}
