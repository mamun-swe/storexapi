import { Router } from "express"
import { authRouter } from "./auth.route"
import { storeRouter } from "./store.route"

import { storeOwner } from "../middlewares/permission.middleware"

export const router: Router = Router()

router.use("/auth", authRouter)
router.use("/store", storeOwner, storeRouter)