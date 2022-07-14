"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.login = void 0;
const helpers_1 = require("../helpers");
/* login validator */
const login = (data) => {
    let errors = {};
    if (!data.email || (0, helpers_1.isEmpty)(data.email))
        errors.email = "E-mail is required.";
    if (data.email && !(0, helpers_1.isValidEmail)(data.email))
        errors.email = "E-mail isn't valid.";
    if (!data.password || (0, helpers_1.isEmpty)(data.password))
        errors.password = "Password is required.";
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
exports.login = login;
/* create validator */
const create = (data) => {
    let errors = {};
    if (!data.name || (0, helpers_1.isEmpty)(data.name))
        errors.name = "Name is required.";
    if (!data.email || (0, helpers_1.isEmpty)(data.email))
        errors.email = "E-mail is required.";
    if (data.email && !(0, helpers_1.isValidEmail)(data.email))
        errors.email = "E-mail isn't valid.";
    if (!data.address || (0, helpers_1.isEmpty)(data.address))
        errors.address = "Address is required.";
    if (!data.city || (0, helpers_1.isEmpty)(data.city))
        errors.city = "City is required.";
    if (!data.country || (0, helpers_1.isEmpty)(data.country))
        errors.country = "Country is required.";
    if (!data.password || (0, helpers_1.isEmpty)(data.password))
        errors.password = "Password is required.";
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
exports.create = create;
