
import { Schema, model } from "mongoose"
import { UserTypes } from "../types/user"

const userSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    profile_image: {
        type: String,
        trim: true,
        default: null
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    }
}, {
    timestamps: true
})
export const User = model<UserTypes>("User", userSchema)