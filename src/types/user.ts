
import { Document, ObjectId } from "mongoose"

export interface UserTypes extends Document {
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

export type UserUpdateTypes = {
    name: string,
    email: string,
    address: string,
    city: string,
    country: string
}

export interface UserShowTypes extends Document {
    _id: string,
    name: string,
    email: string,
    address: string,
    city: string,
    country: string,
    role: "user",
    profile_image: string | null,
    created_by: any
}