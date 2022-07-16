
import { NextFunction, Request, Response } from "express"
import { hash as hashPassword } from "bcryptjs"
import { validator } from "../validators"
import { User } from "../models/user.model"
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
            data: results,
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
            password,
            profile_image
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
            profile_image,
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
        const result = await User.findOne({
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
        const {
            name,
            email,
            address,
            city,
            country,
            profile_image
        } = req.body

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
        const isAvailable = await User.findOne({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        })

        if (!isAvailable) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "User not found."
                }
            })
        }

        /* Check unique email to this store */
        const isExistEmail = await User.findOne({
            $and: [
                { _id: { $ne: id } },
                { created_by: store_id },
                { email }
            ]
        })

        if (isExistEmail) {
            return res.status(409).json({
                status: false,
                errors: {
                    message: "This email already exist."
                }
            })
        }

        /* Update category title */
        await User.findOneAndUpdate(
            {
                $and: [
                    { created_by: store_id },
                    { _id: id }
                ]
            },
            {
                $set: {
                    name,
                    email,
                    address,
                    city,
                    country,
                    profile_image
                }
            }
        )

        res.status(201).json({
            status: true,
            message: "User updated."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Search from resources */
export const Search = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { store_id } = req.store
        const { query } = req.body

        /* Check validation */
        const validate = await validator.user.search(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* search query */
        const queryValue = new RegExp(query, 'i')
        const results = await User.find(
            {
                $and: [
                    { created_by: store_id },
                    { name: queryValue }
                ]
            },
            { password: 0 }
        )

        res.status(200).json({
            status: true,
            data: results
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}