import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, ValidateNested, isNumberString } from "class-validator";
import { product_colors, product_sizes, specifications } from "../interfaces";
import { Type } from "class-transformer";
import { String128 } from "aws-sdk/clients/sagemaker";

class Specification {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    value: string;
}
  
class ProductSize {
    @IsString()
    @IsNotEmpty()
    size: string;
  
    @IsNumber()
    @IsNotEmpty()
    price: number;
}
  
class ProductColor {
    @IsString()
    @IsNotEmpty()
    color: string;
}


class UpdateSpecification {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString()
    title?: string;
    
    @IsOptional()
    @IsString()
    value?: string;
}
  
class UpdateProductSize {
    @IsOptional()
    id?: number;
    
    @IsString()
    size?: string;
    
    @IsNumber()
    price?: number;
}
  
class UpdateProductColor {
    @IsOptional()
    id?: number;

    @IsString()
    color?: string;
}


export class ProductDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    additional_info: string;

    @IsString()
    @IsNotEmpty()
    additional_details: string;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @IsNumber()
    @IsNotEmpty()
    subCategoryId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Specification)
    @IsNotEmpty()
    specifications: Specification[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductSize)
    @IsNotEmpty()
    product_sizes: ProductSize[];

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    product_colors: string[];


    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];

}



export class UpdateProductDTO {
    @IsOptional()
    name?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    additional_info?: string;

    @IsOptional()
    additional_details?: string;

    @IsOptional()
    categoryId?: number;

    @IsOptional()
    subCategoryId?: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateSpecification)
    specifications?: UpdateSpecification[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateProductSize)
    product_sizes?: UpdateProductSize[];
    
    @IsOptional()
    @IsArray()
    @Type(() => UpdateProductColor)
    product_colors?: UpdateProductColor[];


    @IsOptional()
    @IsArray()
    images?: (string | number)[];

}