
export type CartType = {
    product: any,
    quantity: number,
    created_by: any
}

export type CartCreateType = {
    product: any,
    quantity: number
}

export type CartErrorType = {
    product: string,
    quantity: string
}