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
exports.storeOwner = void 0;
const helpers_1 = require("../helpers");
const storeOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield req.headers.authorization;
        if (!token) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Authorization token not found."
                }
            });
        }
        /* verify split token */
        const splitToken = yield token.split(' ')[1];
        const decode = yield (0, helpers_1.verifyJwtToken)(splitToken);
        /* check role */
        if (decode.role !== "owner") {
            return res.status(501).json({
                status: false,
                errors: {
                    message: "You have no access."
                }
            });
        }
        req.store = {
            store_id: decode.id,
            store_name: decode.name
        };
        next();
    }
    catch (error) {
        if (error) {
            console.log(error);
            if (error.name === "TokenExpiredError") {
                return res.status(410).json({ message: "Authorization token expired." });
            }
            return res.status(501).json({ message: "Unauthorized request." });
        }
    }
});
exports.storeOwner = storeOwner;
