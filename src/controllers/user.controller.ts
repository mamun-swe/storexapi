
import { NextFunction, Request, Response } from "express"
import { hash as hashPassword } from "bcryptjs"
import { validator } from "../validators"
import { User } from "../models/user.model"
import { UserShowTypes, UserTypes } from "../types/user"
import { isValidMongooseId } from "../middlewares/mongooseId.middleware"
import { paginate, paginateQueryParams } from "../helpers/pagination.helper"

/* List of reources */
export const Index = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { store_id } = req.store
        const { limit, page } = paginateQueryParams(req.query)

        const totalItems = await User.countDocuments({ created_by: store_id })
        const results = await User.find(
            { created_by: store_id },
            { password: 0 }
        )
            .sort({ _id: -1 })
            .skip((page * limit) - limit)
            .limit(limit)

        res.status(200).json({
            status: true,
            data: <UserShowTypes[] | []>results,
            paginate: paginate({ page, limit, total_items: totalItems })
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Store new resource */
export const Store = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { store_id } = req.store
        const {
            name,
            email,
            address,
            city,
            country,
            password
        } = req.body

        /* Check validation */
        const validate = await validator.user.create(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Check existing email to this store */
        const isAvailableEmailThisStore = await User.findOne({
            $and: [
                { email }, { created_by: store_id }
            ]
        })

        if (isAvailableEmailThisStore) {
            return res.status(409).json({
                status: false,
                errors: {
                    message: "Account already exist."
                }
            })
        }

        /* Hash password */
        const encryptedHashPassword = await hashPassword(password, 10)
        const newUser = new User({
            name,
            email,
            address,
            city,
            country,
            password: encryptedHashPassword,
            created_by: store_id
        })

        await newUser.save()

        res.status(201).json({
            status: true,
            message: "User created."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Show specific resource */
export const Show = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { store_id } = req.store
        const { id } = req.params

        /* Validate mongoose ID */
        await isValidMongooseId(id)
        const result = <UserTypes | null>await User.findOne({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        },
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
export const Update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { store_id } = req.store
        const { id } = req.params
        const { title } = req.body

        await isValidMongooseId(id)

        /* Check validation */
        const validate = await validator.user.update(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Check available */
        const isAvailable = await User.findById(id)
        if (!isAvailable) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "User not found."
                }
            })
        }

        /* Check owner */
        if (isAvailable.created_by.toString() !== store_id.toString()) {
            return res.status(408).json({
                status: false,
                errors: {
                    message: "You have no rights to edit this category."
                }
            })
        }

        /* Check unique title */
        const isExist = await User.findOne({
            $and: [
                { _id: { $ne: id } },
                { title }
            ]
        })

        if (isExist) {
            return res.status(409).json({
                status: false,
                errors: {
                    message: "This title already exist."
                }
            })
        }

        /* Update category title */
        await User.findByIdAndUpdate(
            id,
            { $set: { title } }
        )

        res.status(201).json({
            status: true,
            message: "Category updated."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}