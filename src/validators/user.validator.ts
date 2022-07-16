
import { IRUser, IRUserUpdate, IRUserSearch } from "../types/user"
import { isEmpty, isValidEmail } from "../helpers"

/* create validator */
export const create = (data: IRUser) => {
    let errors: IRUser = <IRUser>{}

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
export const update = (data: IRUserUpdate) => {
    let errors: IRUserUpdate = <IRUserUpdate>{}

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

/* search validator */
export const search = (data: IRUserSearch) => {
    let errors: IRUserSearch = <IRUserSearch>{}

    if (!data.query || isEmpty(data.query)) errors.query = "Query is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}