"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidMongooseId = void 0;
const mongoose_1 = require("mongoose");
/* Check validate mongoose ID */
const isValidMongooseId = (id) => {
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        let error = new Error();
        error.status = 400;
        throw error;
    }
};
exports.isValidMongooseId = isValidMongooseId;
