import express, { Express, NextFunction, Response, Request } from "express"
import cors from "cors"
import path from "path"
import morgan from "morgan"
import helmet from "helmet"
import dotenv from "dotenv"
import nocache from "nocache"
import bodyParser from "body-parser"
import compression from "compression"
dotenv.config()
import { router } from "./routes"
import { errorHandeller } from "./middlewares/error-handeller.middleware"
import jsonData from "../data.json"

export const app: Express = express()
app.use(cors())
app.use(helmet())
app.use(nocache())
app.use(morgan('dev'))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("views"))

/* set the view engine to ejs */
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

/* Base route */
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.render("pages/index", { data: jsonData })
})

/* Documentation route */
app.get("/docs", (req: Request, res: Response, next: NextFunction) => {
    res.render("pages/docs", { data: jsonData })
})

/* Integrate API routes */
app.use("/api/v1", router)

/* Error handelling middleware registration */
app.use(errorHandeller)
