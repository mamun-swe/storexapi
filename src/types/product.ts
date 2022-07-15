

export type ProductType = {
    category: any,
    title: string,
    price: number,
    quantity: number,
    description: string,
    image: string,
    created_by: any
}

export type ProductCreateType = {
    category: any,
    title: string,
    price: number,
    quantity: number,
    description: string,
    image: string
}

export type ProductCreateErrorType = {
    category: string,
    title: string,
    price: string,
    quantity: string,
    description: string,
    image: string
}