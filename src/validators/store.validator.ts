
import { LoginType, StoreType } from "../types"
import { isEmpty, isValidEmail } from "../helpers"

/* login validator */
export const login = (data: LoginType) => {
    let errors: LoginType = <LoginType>{}

    if (!data.email || isEmpty(data.email)) errors.email = "E-mail is required."
    if (data.email && !isValidEmail(data.email)) errors.email = "E-mail isn't valid."
    if (!data.password || isEmpty(data.password)) errors.password = "Password is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

/* create validator */
export const create = (data: StoreType) => {
    let errors: StoreType = <StoreType>{}

    if (!data.name || isEmpty(data.name)) errors.name = "Name is required."
    if (!data.email || isEmpty(data.email)) errors.email = "E-mail is required."
    if (data.email && !isValidEmail(data.email)) errors.email = "E-mail isn't valid."

    if (!data.address || isEmpty(data.address)) errors.address = "Address is required."
    if (!data.city || isEmpty(data.city)) errors.city = "City is required."
    if (!data.country || isEmpty(data.country)) errors.country = "Country is required."
    if (!data.password || isEmpty(data.password)) errors.password = "Password is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}