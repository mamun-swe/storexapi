
import express from "express"
import * as OrderController from "../controllers/order.controller"

export const orderRouter = express.Router()

orderRouter.get("/", OrderController.Index)
orderRouter.post("/", OrderController.Store)
orderRouter.get("/:id", OrderController.Show)
orderRouter.put("/:id", OrderController.Update)
orderRouter.post("/search", OrderController.Search)