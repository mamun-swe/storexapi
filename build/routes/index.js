"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_route_1 = require("./auth.route");
exports.router = (0, express_1.Router)();
exports.router.use("/auth", auth_route_1.authRouter);
