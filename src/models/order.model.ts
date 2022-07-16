
import { Schema, model } from "mongoose"
import { IROrder } from "../types/order"

const orderSchema: Schema = new Schema({
    order_id: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "CREATED",
        enum: ["CREATED", "ACCEPTED", "DELIVERED", "CANCELED"]
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    }
}, {
    timestamps: true
})

export const Order = model<IROrder>("Order", orderSchema)