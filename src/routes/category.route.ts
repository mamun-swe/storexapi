
import express from "express"
import * as CategoryController from "../controllers/category.controller"

export const categoryRouter = express.Router()

categoryRouter.get("/", CategoryController.Index)
categoryRouter.post("/", CategoryController.Store)
categoryRouter.get("/:id", CategoryController.Show)
categoryRouter.put("/:id", CategoryController.Update)
