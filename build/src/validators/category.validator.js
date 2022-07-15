"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const helpers_1 = require("../helpers");
/* create validator */
const create = (data) => {
    let errors = {};
    if (!data.title || (0, helpers_1.isEmpty)(data.title))
        errors.title = "Title is required.";
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
exports.create = create;
