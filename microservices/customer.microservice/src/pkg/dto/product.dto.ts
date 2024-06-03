import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MinLength } from "class-validator";
import { NumString } from "../interfaces";

export class GetProdQueryDTO {

    @IsOptional()
    subCategoryId: NumString;

    @IsOptional()
    categoryId: NumString;

    @IsOptional()
    productId: NumString;
}

export class SearchDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    term: string;

    @IsOptional()
    limit: number;

    @IsOptional()
    page: number;
}

export class GetFilterDTO {

    @IsString()
    search_term: string;

    @IsOptional()
    is_category: string | boolean;

    @IsOptional()
    is_subCategory: string | boolean;

    @IsOptional()
    is_product: string | boolean;
}

export class ApplyFilterDTO {

    @IsObject()
    filter: Object;

    @IsArray()
    prod_ids: Array<number>;
}

export class AddFavDTO {

    @IsNotEmpty()
    productId: number;
}

export class DeleteFavDTO {

    @IsNotEmpty()
    productId: any;
}



export class CartDTO {
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    b_userId: number;
    
    @IsNumber()
    @IsNotEmpty()
    productId: number;
    
    @IsNumber()
    @IsNotEmpty()
    productSizeId: number;
    
    @IsNumber()
    @IsOptional()
    productColorId?: number;
}


export class UpdateItemQuantityDTO{
    @IsNumber()
    @IsNotEmpty()
    cart_item_id: number;

    @IsString()
    @IsNotEmpty()
    operation: string;
}