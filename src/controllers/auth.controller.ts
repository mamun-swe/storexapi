import { NextFunction, Request, Response } from "express"

/* Login to account */
export const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
            message: "Register an login."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
} 

