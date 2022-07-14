import { NextFunction, Request, Response } from "express"
import { compare as comparePassword, hash as hashPassword } from "bcryptjs"
import { Store } from "../models/store.model"
import { createJwtToken } from "../helpers"
import { validator } from "../validators"

/* Login to account */
export const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            email,
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

        /* Check available email */
        const isAccountAvailable = await Store.findOne({ email })
        if (!isAccountAvailable) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Invalid credentials."
                }
            })
        }

        /* Compare password */
        const isPasswordMatches = await comparePassword(password, isAccountAvailable.password)
        if (!isPasswordMatches) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: 'Invalid credentials.'
                }
            })
        }

        /* Generate JWT token */
        const token = await createJwtToken({
            id: isAccountAvailable._id,
            name: isAccountAvailable.name,
            role: isAccountAvailable.role
        })

        res.status(200).json({
            status: true,
            token: token
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
        const {
            name,
            email,
            address,
            city,
            country,
            password
        } = req.body

        /* Check validation */
        const validate = await validator.store.create(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Check exist email */
        const isExistEmail = await Store.findOne({ email })
        if (isExistEmail) {
            return res.status(409).json({
                status: false,
                errors: {
                    message: "This email already exist."
                }
            })
        }

        /* Hash password */
        const encryptedHashPassword = await hashPassword(password, 10)
        const newStore = new Store({
            name,
            email,
            address,
            city,
            country,
            password: encryptedHashPassword
        })

        await newStore.save()

        /* Generate JWT token */
        const token = await createJwtToken({
            id: newStore._id,
            name: newStore.name,
            role: "owner"
        })

        res.status(201).json({
            status: true,
            message: "Account created.",
            token: token
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Reset password */
export const Reset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            email,
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

        /* Check available email */
        const isAccountAvailable = await Store.findOne({ email })
        if (!isAccountAvailable) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Account not available."
                }
            })
        }

        /* Hash password */
        const encryptedHashPassword = await hashPassword(password, 10)
        await Store.findOneAndUpdate(
            { email },
            { $set: { password: encryptedHashPassword } }
        )

        res.status(201).json({
            status: true,
            message: "Password changes."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}
