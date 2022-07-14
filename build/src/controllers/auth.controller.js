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
exports.Reset = exports.Register = exports.Login = void 0;
const bcryptjs_1 = require("bcryptjs");
const store_model_1 = require("../models/store.model");
const helpers_1 = require("../helpers");
const validators_1 = require("../validators");
/* Login to account */
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        /* Check validation */
        const validate = yield validators_1.validator.store.login(req.body);
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            });
        }
        /* Check available email */
        const isAccountAvailable = yield store_model_1.Store.findOne({ email });
        if (!isAccountAvailable) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Invalid credentials."
                }
            });
        }
        /* Compare password */
        const isPasswordMatches = yield (0, bcryptjs_1.compare)(password, isAccountAvailable.password);
        if (!isPasswordMatches) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: 'Invalid credentials.'
                }
            });
        }
        /* Generate JWT token */
        const token = yield (0, helpers_1.createJwtToken)({
            id: isAccountAvailable._id,
            name: isAccountAvailable.name,
            role: isAccountAvailable.role
        });
        res.status(200).json({
            status: true,
            token: token
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.Login = Login;
/* Register an account */
const Register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, address, city, country, password } = req.body;
        /* Check validation */
        const validate = yield validators_1.validator.store.create(req.body);
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            });
        }
        /* Check exist email */
        const isExistEmail = yield store_model_1.Store.findOne({ email });
        if (isExistEmail) {
            return res.status(409).json({
                status: false,
                errors: {
                    message: "This email already exist."
                }
            });
        }
        /* Hash password */
        const encryptedHashPassword = yield (0, bcryptjs_1.hash)(password, 10);
        const newStore = new store_model_1.Store({
            name,
            email,
            address,
            city,
            country,
            password: encryptedHashPassword
        });
        yield newStore.save();
        /* Generate JWT token */
        const token = yield (0, helpers_1.createJwtToken)({
            id: newStore._id,
            name: newStore.name,
            role: "owner"
        });
        res.status(201).json({
            status: true,
            message: "Account created.",
            token: token
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.Register = Register;
/* Reset password */
const Reset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        /* Check validation */
        const validate = yield validators_1.validator.store.login(req.body);
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            });
        }
        /* Check available email */
        const isAccountAvailable = yield store_model_1.Store.findOne({ email });
        if (!isAccountAvailable) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Account not available."
                }
            });
        }
        /* Hash password */
        const encryptedHashPassword = yield (0, bcryptjs_1.hash)(password, 10);
        yield store_model_1.Store.findOneAndUpdate({ email }, { $set: { password: encryptedHashPassword } });
        res.status(201).json({
            status: true,
            message: "Password changes."
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.Reset = Reset;
