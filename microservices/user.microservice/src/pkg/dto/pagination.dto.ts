import { IsNotEmpty, IsOptional } from "class-validator";

export class PaginationParams {
    @IsOptional()
    page: any;

    @IsOptional()
    limit: any;
}