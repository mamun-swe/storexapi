
import { Schema, model } from "mongoose"
import { ProductType } from "../types/product"

const productSchema: Schema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    quantity: {
        type: Number,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
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
export const Product = model<ProductType>("Product", productSchema)