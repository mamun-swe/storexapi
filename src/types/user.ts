
import { Document, ObjectId } from "mongoose"

export interface IRUser extends Document {
    _id: ObjectId,
    name: string,
    email: string,
    address: string,
    city: string,
    country: string,
    role: "user",
    password?: string,
    profile_image?: string,
    created_by: ObjectId,
    createdAt: string,
    updatedAt: string
}

export interface IRUserUpdate {
    name: string,
    email: string,
    address: string,
    city: string,
    country: string
}

export interface IRUserSearch {
    query: string
}