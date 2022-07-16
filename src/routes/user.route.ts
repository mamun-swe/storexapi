
import express from "express"
import * as UserController from "../controllers/user.controller"

export const userRouter = express.Router()

userRouter.get("/", UserController.Index)
userRouter.post("/", UserController.Store)
userRouter.get("/:id", UserController.Show)
