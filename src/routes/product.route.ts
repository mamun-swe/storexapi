
import express from "express"
import * as ProductController from "../controllers/product.controller"

export const productRouter = express.Router()

productRouter.get("/", ProductController.Index)
productRouter.post("/", ProductController.Store)
productRouter.get("/:id", ProductController.Show)
productRouter.put("/:id", ProductController.Update)
productRouter.delete("/:id", ProductController.Destroy)
productRouter.post("/search", ProductController.Search)
