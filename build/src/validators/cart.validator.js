"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const helpers_1 = require("../helpers");
/* create validator */
const create = (data) => {
    let errors = {};
    if (!data.product || (0, helpers_1.isEmpty)(data.product))
        errors.product = "Product is required.";
    if (!data.quantity)
        errors.quantity = "Quantity is required.";
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
exports.create = create;
