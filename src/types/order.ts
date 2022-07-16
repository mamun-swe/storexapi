
import { Document, ObjectId } from "mongoose"

export interface IROrderProduct {
    product: ObjectId,
    quantity: number
}

export interface IROrder extends Document {
    _id: ObjectId,
    order_id: number,
    user: ObjectId,
    total: number,
    status: "CREATED" | "ACCEPTED" | "DELIVERED" | "CANCELED",
    products: IROrderProduct[],
    created_by: ObjectId,
    createdAt: string,
    updatedAt: string
}

export interface IROrderInput {
    user: string,
    status: string
}

export interface IROrderUpdateInput {
    status: string
}