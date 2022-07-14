
import { PaginationQueryType, PaginateType } from "../types"

const nextPage = (page: number, totalPage: number) => {
    if (page && page >= totalPage) {
        return null
    }
    return page + 1
}

const prevPage = (page: number) => {
    if (page && page === 1) {
        return null
    }
    return page - 1
}

export const paginateQueryParams = (data: PaginationQueryType) => {
    let limit: number = 10
    let page: number = 1

    if (data.page) page = data.page
    if (data.page && data.page <= 0) page = 1

    if (data.limit) limit = data.limit
    if (data.limit && data.limit < 10) limit = 10

    return { limit, page }
}

export const paginate = (data: PaginateType) => {
    const page = Number(data.page)
    const limit = Number(data.limit)
    const totalItems = Number(data.total_items)

    const pageTotal = Math.ceil(totalItems / limit)
    return {
        total_items: totalItems,
        limit: limit,
        current_page: page,
        total_page: pageTotal,
        prev_page: prevPage(page),
        next_page: nextPage(page, pageTotal)
    }
}

module.exports = {
    paginateQueryParams,
    paginate
}