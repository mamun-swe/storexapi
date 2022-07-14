
import { Request, Response, NextFunction } from "express"
import { Store } from "../models/store.model"
import { validator } from "../validators"

/* Specific resource */
export const Index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { store_id } = req.store
        const result = await Store.findById(
            store_id,
            { password: 0 }
        )

        res.status(200).json({
            status: true,
            data: result
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Update specific resource */
export const Update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { store_id } = req.store
        const {
            name,
            address,
            city,
            country
        } = req.body

        /* Check validation */
        const validate = await validator.store.update(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        await Store.findByIdAndUpdate(
            store_id,
            {
                $set: {
                    name,
                    address,
                    city,
                    country
                }
            }
        )

        res.status(201).json({
            status: true,
            message: "Store updated."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Add profile image to specific resource */
export const AddProfileImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { store_id } = req.store
        const { profile_image } = req.body

        /* Check validation */
        const validate = await validator.store.addProfileImage(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        await Store.findByIdAndUpdate(
            store_id,
            {
                $set: { profile_image }
            }
        )

        res.status(201).json({
            status: true,
            message: "Profile image added."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Add cover image to specific resource */
export const AddCoverImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { store_id } = req.store
        const { cover_image } = req.body

        /* Check validation */
        const validate = await validator.store.addCoverImage(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        await Store.findByIdAndUpdate(
            store_id,
            {
                $set: { cover_image }
            }
        )

        res.status(201).json({
            status: true,
            message: "Cover image added."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}