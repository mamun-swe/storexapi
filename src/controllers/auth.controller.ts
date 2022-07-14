import { NextFunction, Request, Response } from "express"
import { Store } from "../models/store.model"
import { validator } from "../validators"

/* Login to account */
export const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name,
            email,
            address,
            city,
            country,
            password
        } = req.body

        /* Check validation */
        const validate = await validator.store.login(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Check unique email */
        // const isExistEmail = Store.findOne({ email })
        // if (isExistEmail) {
        //     return res.status(409).json({
        //         status: false,
        //         errors: {
        //             message: "E-mail already used."
        //         }
        //     })
        // }

        // const newStore = new Store({

        // })

        res.status(200).json({
            status: true,
            message: "Account login."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Register an account */
export const Register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            status: true,
            message: "Register an account."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

