"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = exports.paginateQueryParams = void 0;
const nextPage = (page, totalPage) => {
    if (page && page >= totalPage) {
        return null;
    }
    return page + 1;
};
const prevPage = (page) => {
    if (page && page === 1) {
        return null;
    }
    return page - 1;
};
const paginateQueryParams = (data) => {
    let limit = 10;
    let page = 1;
    if (data.page)
        page = data.page;
    if (data.page && data.page <= 0)
        page = 1;
    if (data.limit)
        limit = data.limit;
    if (data.limit && data.limit < 10)
        limit = 10;
    return { limit, page };
};
exports.paginateQueryParams = paginateQueryParams;
const paginate = (data) => {
    const page = Number(data.page);
    const limit = Number(data.limit);
    const totalItems = Number(data.total_items);
    const pageTotal = Math.ceil(totalItems / limit);
    return {
        total_items: totalItems,
        limit: limit,
        current_page: page,
        total_page: pageTotal,
        prev_page: prevPage(page),
        next_page: nextPage(page, pageTotal)
    };
};
exports.paginate = paginate;
module.exports = {
    paginateQueryParams: exports.paginateQueryParams,
    paginate: exports.paginate
};
