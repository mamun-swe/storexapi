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
exports.Register = exports.Login = void 0;
const validators_1 = require("../validators");
/* Login to account */
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, address, city, country, password } = req.body;
        /* Check validation */
        const validate = yield validators_1.validator.store.login(req.body);
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            });
        }
        /* Check unique email */
        // const isExistEmail = Store.findOne({ email })
        // if (isExistEmail) {
        //     return res.status(409).json({
        //         status: false,
        //         errors: {
        //             message: "E-mail already used."
        //         }
        //     })
        // }
        // const newStore = new Store({
        // })
        res.status(200).json({
            status: true,
            message: "Account login."
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
        res.status(200).json({
            status: true,
            message: "Register an account."
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
