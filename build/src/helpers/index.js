"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = exports.isValidEmail = void 0;
/* E-mail validator */
const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
exports.isValidEmail = isValidEmail;
/* Empty value check */
const isEmpty = (data) => {
    return (data == null || data === '' || data.length === 0);
};
exports.isEmpty = isEmpty;
