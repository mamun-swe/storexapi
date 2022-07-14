import { NextFunction, Request, Response } from "express"
import { verifyJwtToken } from "../helpers"

export const storeOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: any = await req.headers.authorization
        if (!token) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Authorization token not found."
                }
            })
        }

        /* verify split token */
        const splitToken = await token.split(' ')[1]
        const decode = await verifyJwtToken(splitToken)

        /* check role */
        if (decode.role !== "owner") {
            return res.status(501).json({
                status: false,
                errors: {
                    message: "You have no access."
                }
            })
        }

        req.store = {
            store_id: decode.id,
            store_name: decode.name
        }
        next()
    } catch (error: any) {
        if (error) {
            console.log(error)

            if (error.name === "TokenExpiredError") {
                return res.status(410).json({ message: "Authorization token expired." })
            }
            return res.status(501).json({ message: "Unauthorized request." })
        }
    }
}