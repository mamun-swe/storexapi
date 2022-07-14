"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const os_1 = require("os");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const nocache_1 = __importDefault(require("nocache"));
const process_1 = __importDefault(require("process"));
const cluster_1 = __importDefault(require("cluster"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const routes_1 = require("./src/routes");
dotenv_1.default.config();
const numCPUs = (0, os_1.cpus)().length;
const port = process_1.default.env.PORT || 5000;
const DB_URI = process_1.default.env.DB_URI;
if (cluster_1.default.isMaster) {
    console.log(`Primary ${process_1.default.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, nocache_1.default)());
    app.use((0, morgan_1.default)('dev'));
    app.use((0, compression_1.default)());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    /* Base route */
    app.get("/", (req, res, next) => {
        res.status(200).json({
            message: "Welcome to storexapi platform.",
            documentation: "https://documenter.getpostman.com/view/5909130/UzQuPR5Y"
        });
    });
    /* Integrate API routes */
    app.use("/api/v1", routes_1.router);
    /* Error handelling */
    app.use((error, req, res, next) => {
        if (error.status == 404) {
            return res.status(404).json({
                status: false,
                errors: { message: error.message }
            });
        }
        if (error.status == 400) {
            return res.status(400).json({
                status: false,
                errors: { message: "Bad request." }
            });
        }
        if (error.status == 401) {
            return res.status(401).json({
                status: false,
                errors: { message: "You have no permission." }
            });
        }
        return res.status(500).json({
            status: false,
            errors: { message: "Something going wrong." }
        });
    });
    /* DB Connection */
    mongoose_1.default.connect(DB_URI, { autoIndex: false })
        .then(() => console.log("Database connected"))
        .catch(error => {
        if (error)
            console.log('Failed to connect DB');
    });
    /* Start app to specific PORT */
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}
