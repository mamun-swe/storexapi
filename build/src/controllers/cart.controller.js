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
exports.Destroy = exports.Update = exports.Store = exports.Index = void 0;
const validators_1 = require("../validators");
const cart_model_1 = require("../models/cart.model");
const mongooseId_middleware_1 = require("../middlewares/mongooseId.middleware");
/* List of reources */
const Index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let totalPrice = 0;
        const { store_id } = req.store;
        const results = yield cart_model_1.Cart.find({ created_by: store_id })
            .sort({ _id: -1 })
            .populate("product", "title price image")
            .exec();
        const resultLength = results.length;
        if (results && resultLength > 0) {
            for (let i = 0; i < resultLength; i++) {
                const element = results[i];
                totalPrice += element.quantity * ((_a = element === null || element === void 0 ? void 0 : element.product) === null || _a === void 0 ? void 0 : _a.price);
            }
        }
        res.status(200).json({
            status: true,
            total: totalPrice,
            data: results
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.Index = Index;
/* Store new resource */
const Store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { store_id } = req.store;
        const { product, quantity } = req.body;
        /* Check validation */
        const validate = yield validators_1.validator.cart.create(req.body);
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            });
        }
        /* Check valid mongoose ID */
        yield (0, mongooseId_middleware_1.isValidMongooseId)(product);
        /* New cart object */
        const newCart = new cart_model_1.Cart({
            product,
            quantity,
            created_by: store_id
        });
        /* Save to database */
        yield newCart.save();
        res.status(201).json({
            status: true,
            message: "Product added to cart."
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.Store = Store;
/* Update specific resource */
const Update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { store_id } = req.store;
        const { id } = req.params;
        const { quantity } = req.body;
        /* Check valid mongoose ID */
        yield (0, mongooseId_middleware_1.isValidMongooseId)(id);
        /* Request body validation */
        if (!quantity) {
            return res.status(422).json({
                status: false,
                errors: {
                    quantity: "Quantity is required."
                }
            });
        }
        /* Check cart avaibility */
        const isAvailableCart = yield cart_model_1.Cart.findOne({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        });
        if (!isAvailableCart) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Product not available to your cart."
                }
            });
        }
        /* Update product quantity */
        yield cart_model_1.Cart.findOneAndUpdate({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        }, { $set: { quantity } });
        res.status(200).json({
            status: true,
            message: "Cart updated."
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.Update = Update;
/* Destroy specific resource */
const Destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { store_id } = req.store;
        /* Check valid mongoose ID */
        yield (0, mongooseId_middleware_1.isValidMongooseId)(id);
        /* Check cart avaibility */
        const isAvailableCart = yield cart_model_1.Cart.findOne({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        });
        if (!isAvailableCart) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Product not available to your cart."
                }
            });
        }
        /* delete cart from database */
        yield cart_model_1.Cart.findOneAndDelete({
            $and: [
                { created_by: store_id },
                { _id: id }
            ]
        });
        res.status(200).json({
            status: true,
            message: "Product removed."
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.Destroy = Destroy;
