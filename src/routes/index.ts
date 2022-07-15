import { Router } from "express"
import { authRouter } from "./auth.route"
import { storeRouter } from "./store.route"
import { categoryRouter } from "./category.route"
import { productRouter } from "./product.route"
import { cartRouter } from "./cart.route"

import { storeOwner } from "../middlewares/permission.middleware"

export const router: Router = Router()

router.use("/auth", authRouter)
router.use("/store", storeOwner, storeRouter)
router.use("/category", storeOwner, categoryRouter)
router.use("/product", storeOwner, productRouter)
router.use("/cart", storeOwner, cartRouter)