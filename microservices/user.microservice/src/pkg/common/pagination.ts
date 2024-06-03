import { pagination } from "../interfaces";

export const BuildPagination = (pagination: pagination): pagination => {

    !pagination.limit && (pagination.limit = 10);
    !pagination.page && (pagination.page = 1);

    typeof (pagination.limit) != 'number' &&
        (pagination.limit = parseInt(pagination.limit));
    typeof (pagination.page) != 'number' &&
        (pagination.page = parseInt(pagination.page));

    pagination.limit < 1 && (pagination.limit = 10);
    pagination.page < 1 && (pagination.page = 1);

    return pagination;
}