
import express from "express"
import * as StoreController from "../controllers/store.controller"

export const storeRouter = express.Router()

storeRouter.get("/", StoreController.Index)
storeRouter.put("/", StoreController.Update)
storeRouter.post("/add-profile-image", StoreController.AddProfileImage)
storeRouter.post("/add-cover-image", StoreController.AddCoverImage)
