import { HttpStatus, Injectable } from "@nestjs/common";
import { Response } from "express";
import { ErrorCode, ErrorMessage, SuccessMessage } from "src/core/constants";
import { ResponseHandler } from "src/pkg/common";

import { ApplyFilterDTO, GetFilterDTO } from "src/pkg/dto";
import { FilterHelper, ProductHelper } from "src/pkg/helper";
import { filter } from "src/pkg/interfaces";

@Injectable()
export class FilterService {

    constructor(
        private rest: ResponseHandler,
        private filter: FilterHelper,
    ) { }

    async GetFilter(Filter: GetFilterDTO, Response: Response) {
        try {
            const is_category = Filter.is_category === ('true' || true) ? true : false,
                is_subCategory = Filter.is_subCategory === ('true' || true) ? true : false,
                is_product = Filter.is_product === ('true' || true) ? true : false;

            const sortBy: string[] = ['Price : High To Low', 'Price : Low To High', 'Newest Arrivals'],
                rates: string[] = ['4 Star & Up', '3 Star & Up', '2 Star & Up', '1 Star & Up'],
                price: string[] = ['Below 500', '500 To 1000', '1000 To 5000', 'Above 5000'];

            const fq: filter = { is_category, is_subCategory, is_product }

            if (!is_category && !is_subCategory && !is_product) {
                throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_VALIDATION, undefined);
            }

            const data = await this.filter.GetFilter(fq, Filter.search_term);

            const response = { sortBy, rates, price, ...data }

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.GET_FILTER_SUCCEED, response)

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async ApplyFilter(ReqBody: ApplyFilterDTO, Response: Response) {
        try {
            const filters = Object.keys(ReqBody.filter), prod = ReqBody.prod_ids;
            if (filters.length === 0 || prod.length === 0) throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_VALIDATION, undefined);

            const products = await this.filter.ApplyFilter(ReqBody)

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.GET_FILTER_SUCCEED, products)

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

}