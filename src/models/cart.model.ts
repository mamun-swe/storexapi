
import { Schema, model } from "mongoose"
import { CartType } from "../types/cart"

const cartSchema: Schema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    }
}, {
    timestamps: true
})

export const Cart = model<CartType>("Cart", cartSchema)