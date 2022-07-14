import express, { Express, NextFunction, Response, Request } from "express"
import { cpus } from "os"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import dotenv from "dotenv"
import nocache from "nocache"
import process from "process"
import cluster from "cluster"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import compression from "compression"
import { router } from "./src/routes"

dotenv.config()
const numCPUs = cpus().length
const port: any = process.env.PORT || 5000
const DB_URI: any = process.env.DB_URI

if (cluster.isMaster) {
    console.log(`Primary ${process.pid} is running`)

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
} else {

    const app: Express = express()
    app.use(cors())
    app.use(helmet())
    app.use(nocache())
    app.use(morgan('dev'))
    app.use(compression())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    /* Base route */
    app.get("/", (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({
            message: "Welcome to storexapi platform using heroku",
            documentation: ""
        })
    })

    /* Integrate API routes */
    app.use("/api/v1", router)

    /* Error handelling */
    app.use((error: any, req: Request, res: Response, next: NextFunction) => {

        if (error.status == 404) {
            return res.status(404).json({
                status: false,
                errors: { message: error.message }
            })
        }

        if (error.status == 400) {
            return res.status(400).json({
                status: false,
                errors: { message: "Bad request." }
            })
        }

        if (error.status == 401) {
            return res.status(401).json({
                status: false,
                errors: { message: "You have no permission." }
            })
        }

        return res.status(500).json({
            status: false,
            errors: { message: "Something going wrong." }
        })
    })


    /* DB Connection */
    mongoose.connect(DB_URI, { autoIndex: false })
        .then(() => console.log("Database connected"))
        .catch(error => {
            if (error) console.log('Failed to connect DB')
        })

    /* Start app to specific PORT */
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`)
    })
}