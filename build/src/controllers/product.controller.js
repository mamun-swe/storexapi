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
exports.Destroy = exports.Update = exports.Show = exports.Store = exports.Index = void 0;
const validators_1 = require("../validators");
const product_model_1 = require("../models/product.model");
const mongooseId_middleware_1 = require("../middlewares/mongooseId.middleware");
const pagination_helper_1 = require("../helpers/pagination.helper");
/* List of reources */
const Index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { store_id } = req.store;
        const { limit, page } = (0, pagination_helper_1.paginateQueryParams)(req.query);
        const totalItems = yield product_model_1.Product.countDocuments({ created_by: store_id });
        const results = yield product_model_1.Product.find({ created_by: store_id })
            .sort({ _id: -1 })
            .skip((page * limit) - limit)
            .limit(limit)
            .populate("category", "title")
            .exec();
        res.status(200).json({
            status: true,
            data: results,
            paginate: (0, pagination_helper_1.paginate)({ page, limit, total_items: totalItems })
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
/* Store new reource */
const Store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { store_id } = req.store;
        const { category, title, price, quantity, description, image } = req.body;
        /* Check validation */
        const validate = yield validators_1.validator.product.create(req.body);
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            });
        }
        /* Check category valid ID */
        yield (0, mongooseId_middleware_1.isValidMongooseId)(category);
        /* New product object */
        const newProduct = new product_model_1.Product({
            category,
            title,
            price,
            quantity,
            description,
            image,
            created_by: store_id
        });
        yield newProduct.save();
        res.status(201).json({
            status: true,
            message: "Product created."
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
/* Show specific reource */
const Show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { store_id } = req.store;
        const { id } = req.params;
        /* Mongoose id validate */
        yield (0, mongooseId_middleware_1.isValidMongooseId)(id);
        /* Check product owner & availability */
        const result = yield product_model_1.Product.findOne({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        })
            .populate("category", "title")
            .exec();
        if (!result) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Product not available to your store."
                }
            });
        }
        res.status(200).json({
            status: true,
            data: result
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.Show = Show;
/* Update specific reource */
const Update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { store_id } = req.store;
        const { id } = req.params;
        const { category, title, price, quantity, description, image } = req.body;
        /* Check validation */
        const validate = yield validators_1.validator.product.create(req.body);
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            });
        }
        /* Mongoose id validate */
        yield (0, mongooseId_middleware_1.isValidMongooseId)(id);
        yield (0, mongooseId_middleware_1.isValidMongooseId)(category);
        /* Check product owner & availability */
        const isAvailableProduct = yield product_model_1.Product.findOne({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        });
        if (!isAvailableProduct) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Product not available to your store."
                }
            });
        }
        /* Find & update product to database */
        yield product_model_1.Product.findOneAndUpdate({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        }, {
            $set: {
                category,
                title,
                price,
                quantity,
                description,
                image
            }
        });
        res.status(201).json({
            status: true,
            message: "Product updated."
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
/* Destroy specific reource */
const Destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { store_id } = req.store;
        const { id } = req.params;
        /* Mongoose id validate */
        yield (0, mongooseId_middleware_1.isValidMongooseId)(id);
        /* Check product owner & availability */
        const isAvailableProduct = yield product_model_1.Product.findOne({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        });
        if (!isAvailableProduct) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Product not available to your store."
                }
            });
        }
        /* Delete product from database */
        yield product_model_1.Product.findOneAndDelete({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        });
        res.status(200).json({
            status: true,
            message: "Product deleted."
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
