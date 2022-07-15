
import { NextFunction, Request, Response } from "express"
import { validator } from "../validators"
import { Cart } from "../models/cart.model"
import { isValidMongooseId } from "../middlewares/mongooseId.middleware"

/* List of reources */
export const Index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let totalPrice = 0
        const { store_id } = req.store

        const results = await Cart.find({ created_by: store_id })
            .sort({ _id: -1 })
            .populate("product", "title price image")
            .exec()

        const resultLength = results.length

        if (results && resultLength > 0) {
            for (let i = 0; i < resultLength; i++) {
                const element = results[i]
                totalPrice += element.quantity * element?.product?.price
            }
        }

        res.status(200).json({
            status: true,
            total: totalPrice,
            data: results
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
        const { product, quantity } = req.body

        /* Check validation */
        const validate = await validator.cart.create(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Check valid mongoose ID */
        await isValidMongooseId(product)

        /* New cart object */
        const newCart = new Cart({
            product,
            quantity,
            created_by: store_id
        })

        /* Save to database */
        await newCart.save()

        res.status(201).json({
            status: true,
            message: "Product added to cart."
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
        const { quantity } = req.body

        /* Check valid mongoose ID */
        await isValidMongooseId(id)

        /* Request body validation */
        if (!quantity) {
            return res.status(422).json({
                status: false,
                errors: {
                    quantity: "Quantity is required."
                }
            })
        }

        /* Check cart avaibility */
        const isAvailableCart = await Cart.findOne({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        })
        if (!isAvailableCart) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Product not available to your cart."
                }
            })
        }

        /* Update product quantity */
        await Cart.findOneAndUpdate(
            {
                $and: [
                    { _id: id },
                    { created_by: store_id }
                ]
            },
            { $set: { quantity } }
        )

        res.status(200).json({
            status: true,
            message: "Cart updated."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Destroy specific resource */
export const Destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { store_id } = req.store

        /* Check valid mongoose ID */
        await isValidMongooseId(id)

        /* Check cart avaibility */
        const isAvailableCart = await Cart.findOne({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        })

        if (!isAvailableCart) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Product not available to your cart."
                }
            })
        }

        /* delete cart from database */
        await Cart.findOneAndDelete({
            $and: [
                { created_by: store_id },
                { _id: id }
            ]
        })

        res.status(200).json({
            status: true,
            message: "Product removed."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}