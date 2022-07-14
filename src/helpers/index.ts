import { sign as jwtSign } from "jsonwebtoken"
import { JwtPayloadType } from "../types"

/* E-mail validator */
export const isValidEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

/* Empty value check */
export const isEmpty = (data: string) => {
    return (data == null || data === '' || data.length === 0)
}

/* Create jwt token */
export const createJwtToken = async (payload: JwtPayloadType) => {
    const JWT_SECRET: any = process.env.JWT_SECRET
    
    const token = await jwtSign(
        {
            id: payload.id,
            name: payload.name,
            role: payload.role,
        }, JWT_SECRET, { expiresIn: '1d' }
    )

    return token
}