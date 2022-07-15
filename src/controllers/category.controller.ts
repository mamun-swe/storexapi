
import { NextFunction, Request, Response } from "express"
import { validator } from "../validators"
import { Category } from "../models/category.model"
import { isValidMongooseId } from "../middlewares/mongooseId.middleware"
import { paginate, paginateQueryParams } from "../helpers/pagination.helper"

/* List of reources */
export const Index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { limit, page } = paginateQueryParams(req.query)

        const totalItems = await Category.countDocuments()
        const results = await Category.find()
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
export const Store = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { store_id } = req.store
        const { title } = req.body

        /* Check validation */
        const validate = await validator.category.create(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Check unique title */
        const isExist = await Category.findOne({ title })
        if (isExist) {
            return res.status(409).json({
                status: false,
                errors: {
                    message: "This category already exist."
                }
            })
        }

        const newCategory = new Category({
            title,
            created_by: store_id
        })

        await newCategory.save()

        res.status(201).json({
            status: true,
            message: "Category created."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Show specific resource */
export const Show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        await isValidMongooseId(id)
        const result = await Category.findById(id)

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
        const { id } = req.params
        const { title } = req.body

        await isValidMongooseId(id)

        /* Check validation */
        const validate = await validator.category.create(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Check available */
        const isAvailable = await Category.findById(id)
        if (!isAvailable) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Category not found."
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
        const isExist = await Category.findOne({
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
        await Category.findByIdAndUpdate(
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