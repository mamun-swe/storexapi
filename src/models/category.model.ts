
import { Schema, model } from "mongoose"
import { CategoryType } from "../types/category"

const categorySchema: Schema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    }
}, {
    timestamps: true
})
export const Category = model<CategoryType>("Category", categorySchema)