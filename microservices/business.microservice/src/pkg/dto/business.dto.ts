import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class paginationDTO{
    @IsNumber()
    @IsNotEmpty()
    page: number;

    @IsNumber()
    @IsNotEmpty()
    limit: number;
}


export class SubCategoryDTO{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsString()
    image?: string;
}

export class CategoryDTO extends SubCategoryDTO{
    @IsString()
    @IsNotEmpty()
    type: string;
}


export class UpdateSubCategoryDTO{
    @IsOptional()
    title: string;

    @IsOptional()
    image?: string;
}

export class UpdateCategoryDTO extends UpdateSubCategoryDTO{
    @IsOptional()
    type: string;
}


