
import express from "express"
import * as AuthController from "../controllers/auth.controller"

export const authRouter = express.Router()

authRouter.post("/login", AuthController.Login)
authRouter.post("/register", AuthController.Register)
