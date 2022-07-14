
import { Schema, model } from "mongoose"
import { StoreType } from "../types"

const storeSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
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
    email_verified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "owner"
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
})
export const Store = model<StoreType>("Store", storeSchema)