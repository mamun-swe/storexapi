
import { UserTypes, UserUpdateTypes } from "../types/user"
import { isEmpty, isValidEmail } from "../helpers"

/* create validator */
export const create = (data: UserTypes) => {
    let errors: UserTypes = <UserTypes>{}

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

/* update validator */
export const update = (data: UserUpdateTypes) => {
    let errors: UserUpdateTypes = <UserUpdateTypes>{}

    if (!data.name || isEmpty(data.name)) errors.name = "Name is required."
    if (!data.email || isEmpty(data.email)) errors.email = "E-mail is required."
    if (data.email && !isValidEmail(data.email)) errors.email = "E-mail isn't valid."

    if (!data.address || isEmpty(data.address)) errors.address = "Address is required."
    if (!data.city || isEmpty(data.city)) errors.city = "City is required."
    if (!data.country || isEmpty(data.country)) errors.country = "Country is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}
