
import { NextFunction, Request, Response } from "express"
import { validator } from "../validators"
import { Cart } from "../models/cart.model"
import { User } from "../models/user.model"
import { Order } from "../models/order.model"
import { CartType } from "../types/cart"
import { isValidMongooseId } from "../middlewares/mongooseId.middleware"
import { paginate, paginateQueryParams } from "../helpers/pagination.helper"

/* List of resources */
export const Index = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { store_id } = req.store
        const { limit, page } = paginateQueryParams(req.query)

        const totalItems = await Order.countDocuments({ created_by: store_id })
        const results = await Order.find(
            { created_by: store_id },
            { products: 0 }
        )
            .sort({ _id: -1 })
            .skip((page * limit) - limit)
            .limit(limit)
            .populate("user", "name profile_image")
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

/* Store new resource */
export const Store = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { store_id } = req.store
        const { user, status } = req.body

        /* Check validation */
        const validate = await validator.order.create(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Check valid mongoose id */
        await isValidMongooseId(user)

        /* Check user availabe on my store */
        const isUserAvailableToStore = await User.findOne({
            $and: [
                { _id: user },
                { created_by: store_id }
            ]
        })

        if (!isUserAvailableToStore) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "This user not available to your store."
                }
            })
        }

        /* get all products from cart */
        const cartItems: CartType[] = await Cart.find({ created_by: store_id })
            .populate("product", "price")
            .exec()

        if (cartItems.length < 1) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Your cart is empty."
                }
            })
        }

        /* Calculate cart total & manipulate cart products */
        let cartTotal: number = 0
        const cartProducts = []
        const cartLength = cartItems.length

        for (let i = 0; i < cartLength; i++) {
            const element = cartItems[i]

            cartTotal += element?.product?.price * element.quantity
            cartProducts.push({
                product: element?.product?._id,
                quantity: element.quantity
            })
        }

        /* New order object */
        const newOrder = new Order({
            order_id: Date.now(),
            user,
            total: cartTotal,
            status,
            products: [...cartProducts],
            created_by: store_id
        })

        /* Save order */
        await newOrder.save()

        /* Clear cart items */
        await Cart.deleteMany({ created_by: store_id })

        res.status(201).json({
            status: true,
            message: "Order created."
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

        /* Check valid mongoose id */
        await isValidMongooseId(id)

        const result = await Order.findOne({
            $and: [
                { _id: id },
                { created_by: store_id }
            ]
        })
            .populate("user", "name profile_image")
            .populate("products.product", "title price image")
            .exec()

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
        const { status } = req.body

        /* Check valid mongoose id */
        await isValidMongooseId(id)

        /* Check validation */
        const validate = await validator.order.update(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        const isUpdateStatus = await Order.findOneAndUpdate(
            {
                $and: [
                    { _id: id },
                    { created_by: store_id }
                ]
            },
            { $set: { status } }
        )

        if (!isUpdateStatus) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Order not available."
                }
            })
        }

        res.status(201).json({
            status: true,
            message: "Order status changes."
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
        const { order_id } = req.body

        /* Check validation */
        if (!order_id) {
            return res.status(422).json({
                status: false,
                errors: {
                    order_id: "Order id is required."
                }
            })
        }

        /* Search query */
        const results = await Order.find(
            {
                $and: [
                    { created_by: store_id },
                    { order_id }
                ]
            },
            { products: 0 }
        )
            .populate("user", "name profile_image")
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