"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const mongoose_1 = require("mongoose");
const storeSchema = new mongoose_1.Schema({
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
    },
    profile_image: {
        type: String,
        trim: true,
        default: null
    },
    cover_image: {
        type: String,
        trim: true,
        default: null
    }
}, {
    timestamps: true
});
exports.Store = (0, mongoose_1.model)("Store", storeSchema);
