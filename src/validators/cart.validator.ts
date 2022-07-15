
import { isEmpty } from "../helpers"
import { CartCreateType, CartErrorType } from "../types/cart"

/* create validator */
export const create = (data: CartCreateType) => {
    let errors: CartErrorType = <CartErrorType>{}

    if (!data.product || isEmpty(data.product)) errors.product = "Product is required."
    if (!data.quantity) errors.quantity = "Quantity is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}