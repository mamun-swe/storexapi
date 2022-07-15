"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    created_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    }
}, {
    timestamps: true
});
exports.Cart = (0, mongoose_1.model)("Cart", cartSchema);
