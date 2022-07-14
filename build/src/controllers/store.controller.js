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
exports.AddCoverImage = exports.AddProfileImage = exports.Update = exports.Index = void 0;
const store_model_1 = require("../models/store.model");
const validators_1 = require("../validators");
/* Specific resource */
const Index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { store_id } = req.store;
        const result = yield store_model_1.Store.findById(store_id, { password: 0 });
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
exports.Index = Index;
/* Update specific resource */
const Update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { store_id } = req.store;
        const { name, address, city, country } = req.body;
        /* Check validation */
        const validate = yield validators_1.validator.store.update(req.body);
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            });
        }
        yield store_model_1.Store.findByIdAndUpdate(store_id, {
            $set: {
                name,
                address,
                city,
                country
            }
        });
        res.status(201).json({
            status: true,
            message: "Store updated."
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
/* Add profile image to specific resource */
const AddProfileImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { store_id } = req.store;
        const { profile_image } = req.body;
        /* Check validation */
        const validate = yield validators_1.validator.store.addProfileImage(req.body);
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            });
        }
        yield store_model_1.Store.findByIdAndUpdate(store_id, {
            $set: { profile_image }
        });
        res.status(201).json({
            status: true,
            message: "Profile image added."
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.AddProfileImage = AddProfileImage;
/* Add cover image to specific resource */
const AddCoverImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { store_id } = req.store;
        const { cover_image } = req.body;
        /* Check validation */
        const validate = yield validators_1.validator.store.addCoverImage(req.body);
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            });
        }
        yield store_model_1.Store.findByIdAndUpdate(store_id, {
            $set: { cover_image }
        });
        res.status(201).json({
            status: true,
            message: "Cover image added."
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.AddCoverImage = AddCoverImage;
