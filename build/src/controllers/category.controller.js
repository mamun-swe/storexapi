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
exports.Update = exports.Show = exports.Store = exports.Index = void 0;
const validators_1 = require("../validators");
const category_model_1 = require("../models/category.model");
const mongooseId_middleware_1 = require("../middlewares/mongooseId.middleware");
const pagination_helper_1 = require("../helpers/pagination.helper");
/* List of reources */
const Index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, page } = (0, pagination_helper_1.paginateQueryParams)(req.query);
        const totalItems = yield category_model_1.Category.countDocuments();
        const results = yield category_model_1.Category.find()
            .sort({ _id: -1 })
            .skip((page * limit) - limit)
            .limit(limit);
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
/* Store new resource */
const Store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { store_id } = req.store;
        const { title } = req.body;
        /* Check validation */
        const validate = yield validators_1.validator.category.create(req.body);
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            });
        }
        /* Check unique title */
        const isExist = yield category_model_1.Category.findOne({ title });
        if (isExist) {
            return res.status(409).json({
                status: false,
                errors: {
                    message: "This category already exist."
                }
            });
        }
        const newCategory = new category_model_1.Category({
            title,
            created_by: store_id
        });
        yield newCategory.save();
        res.status(201).json({
            status: true,
            message: "Category created."
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
/* Show specific resource */
const Show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, mongooseId_middleware_1.isValidMongooseId)(id);
        const result = yield category_model_1.Category.findById(id);
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
/* Update specific resource */
const Update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { store_id } = req.store;
        const { id } = req.params;
        const { title } = req.body;
        yield (0, mongooseId_middleware_1.isValidMongooseId)(id);
        /* Check validation */
        const validate = yield validators_1.validator.category.create(req.body);
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            });
        }
        /* Check available */
        const isAvailable = yield category_model_1.Category.findById(id);
        if (!isAvailable) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Category not found."
                }
            });
        }
        /* Check owner */
        if (isAvailable.created_by.toString() !== store_id.toString()) {
            return res.status(408).json({
                status: false,
                errors: {
                    message: "You have no rights to edit this category."
                }
            });
        }
        /* Check unique title */
        const isExist = yield category_model_1.Category.findOne({
            $and: [
                { _id: { $ne: id } },
                { title }
            ]
        });
        if (isExist) {
            return res.status(409).json({
                status: false,
                errors: {
                    message: "This title already exist."
                }
            });
        }
        /* Update category title */
        yield category_model_1.Category.findByIdAndUpdate(id, { $set: { title } });
        res.status(201).json({
            status: true,
            message: "Category updated."
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
