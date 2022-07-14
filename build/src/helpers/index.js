"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJwtToken = exports.isEmpty = exports.isValidEmail = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
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
/* Create jwt token */
const createJwtToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = yield (0, jsonwebtoken_1.sign)({
        id: payload.id,
        name: payload.name,
        role: payload.role,
    }, JWT_SECRET, { expiresIn: '1d' });
    return token;
});
exports.createJwtToken = createJwtToken;
