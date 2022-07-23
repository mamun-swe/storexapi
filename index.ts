import express, { Express, NextFunction, Response, Request } from "express"
import { cpus } from "os"
import cors from "cors"
import path from "path"
import morgan from "morgan"
import helmet from "helmet"
import dotenv from "dotenv"
import nocache from "nocache"
import process from "process"
import cluster from "cluster"
import bodyParser from "body-parser"
import compression from "compression"
dotenv.config()
import { router } from "./src/routes"
import { databaseConnection } from "./src/config/db.config"

const numCPUs = cpus().length
const port: any = process.env.PORT || 5000

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
    app.use(express.static("src/views"))

    /* Base route */
    app.get("/", (req: Request, res: Response, next: NextFunction) => {
        res.sendFile(path.join(__dirname, "src/views/index.html"))
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

    /* Start app to specific PORT & establish database connection */
    app.listen(port, () => {
        databaseConnection()
        console.log(`[server]: Server is running at http://localhost:${port}`)
    })
}