
import express from "express"
import * as CartController from "../controllers/cart.controller"

export const cartRouter = express.Router()

cartRouter.get("/", CartController.Index)
cartRouter.post("/", CartController.Store)
cartRouter.put("/:id", CartController.Update)
cartRouter.delete("/:id", CartController.Destroy)
