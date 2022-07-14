
export type PaginationQueryType = {
    page?: number | 10,
    limit?: number | 0
}

export type PaginateType = {
    page: number,
    limit: number,
    total_items: number
}

export type JwtPayloadType = {
    id: any,
    name: string,
    role: string
}

export type LoginType = {
    email: string,
    password: string
}

export type StoreType = {
    name: string,
    email: string,
    address: string,
    city: string,
    country: string,
    email_verified: boolean,
    role: "owner",
    password: string
}

