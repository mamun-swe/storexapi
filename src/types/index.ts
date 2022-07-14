
declare global {
    namespace Express {
        interface Request {
            store: {
                store_id: any,
                store_name: string
            }
        }
    }
}

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
    password: string,
    profile_image?: string,
    cover_image?: string
}

export type StoreUpdateType = {
    name: string,
    address: string,
    city: string,
    country: string
}

export type StoreProfileImageType = {
    profile_image: string
}

export type StoreCoverImageType = {
    cover_image: string
}