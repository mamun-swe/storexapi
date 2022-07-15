
import { NextFunction, Request, Response } from "express"
import { validator } from "../validators"
import { Product } from "../models/product.model"
import { isValidMongooseId } from "../middlewares/mongooseId.middleware"
import { paginate, paginateQueryParams } from "../helpers/pagination.helper"

/* List of reources */
export const Index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { store_id } = req.store
        const { limit, page } = paginateQueryParams(req.query)

        const totalItems = await Product.countDocuments({ created_by: store_id })
        const results = await Product.find(
            { created_by: store_id },
            { description: 0 }
        )
            .sort({ _id: -1 })
            .skip((page * limit) - limit)
            .limit(limit)
            .populate("category", "title")
            .exec()

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

/* Store new reource */
export const Store = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { store_id } = req.store
        const {
            category,
            title,
            price,
            quantity,
            description,
            image
        } = req.body

        /* Check validation */
        const validate = await validator.product.create(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Check category valid ID */
        await isValidMongooseId(category)

        /* New product object */
        const newProduct = new Product({
            category,
            title,
            price,
            quantity,
            description,
            image,
            created_by: store_id
        })

        await newProduct.save()

        res.status(201).json({
            status: true,
            message: "Product created."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Show specific reource */
export const Show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { store_id } = req.store
        const { id } = req.params

        /* Mongoose id validate */
        await isValidMongooseId(id)

        /* Check product owner & availability */
        const result = await Product.findOne({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        })
            .populate("category", "title")
            .exec()

        if (!result) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Product not available to your store."
                }
            })
        }

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

/* Update specific reource */
export const Update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { store_id } = req.store
        const { id } = req.params
        const {
            category,
            title,
            price,
            quantity,
            description,
            image
        } = req.body

        /* Check validation */
        const validate = await validator.product.create(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Mongoose id validate */
        await isValidMongooseId(id)
        await isValidMongooseId(category)

        /* Check product owner & availability */
        const isAvailableProduct = await Product.findOne({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        })

        if (!isAvailableProduct) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Product not available to your store."
                }
            })
        }

        /* Find & update product to database */
        await Product.findOneAndUpdate(
            {
                $and: [
                    { _id: id },
                    { created_by: store_id }
                ]
            },
            {
                $set: {
                    category,
                    title,
                    price,
                    quantity,
                    description,
                    image
                }
            }
        )

        res.status(201).json({
            status: true,
            message: "Product updated."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Destroy specific reource */
export const Destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { store_id } = req.store
        const { id } = req.params

        /* Mongoose id validate */
        await isValidMongooseId(id)

        /* Check product owner & availability */
        const isAvailableProduct = await Product.findOne({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        })

        if (!isAvailableProduct) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Product not available to your store."
                }
            })
        }

        /* Delete product from database */
        await Product.findOneAndDelete({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        })

        res.status(200).json({
            status: true,
            message: "Product deleted."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Search from resources */
export const Search = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { store_id } = req.store
        const { query } = req.body

        /* Check validation */
        const validate = await validator.product.search(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* search query */
        const queryValue = new RegExp(query, 'i')
        const results = await Product.find(
            {
                $and: [
                    { created_by: store_id },
                    { title: queryValue }
                ]
            },
            { description: 0 }
        )
            .populate("category", "title")
            .exec()

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