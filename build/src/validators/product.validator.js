"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const helpers_1 = require("../helpers");
/* create validator */
const create = (data) => {
    let errors = {};
    if (!data.category || (0, helpers_1.isEmpty)(data.category))
        errors.category = "Category id is required.";
    if (!data.title || (0, helpers_1.isEmpty)(data.title))
        errors.title = "Title is required.";
    if (!data.price)
        errors.price = "Price is required.";
    if (!data.quantity)
        errors.quantity = "Quantity is required.";
    if (!data.description || (0, helpers_1.isEmpty)(data.description))
        errors.description = "Description is required.";
    if (!data.image || (0, helpers_1.isEmpty)(data.image))
        errors.image = "Image path is required.";
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
exports.create = create;
