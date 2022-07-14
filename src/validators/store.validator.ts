
import {
    LoginType,
    StoreType,
    StoreUpdateType,
    StoreProfileImageType,
    StoreCoverImageType
} from "../types"
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

/* update validator */
export const update = (data: StoreUpdateType) => {
    let errors: StoreUpdateType = <StoreUpdateType>{}

    if (!data.name || isEmpty(data.name)) errors.name = "Name is required."
    if (!data.address || isEmpty(data.address)) errors.address = "Address is required."
    if (!data.city || isEmpty(data.city)) errors.city = "City is required."
    if (!data.country || isEmpty(data.country)) errors.country = "Country is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

/* add profile image validator */
export const addProfileImage = (data: StoreProfileImageType) => {
    let errors: StoreProfileImageType = <StoreProfileImageType>{}

    if (!data.profile_image || isEmpty(data.profile_image)) {
        errors.profile_image = "Image path is required."
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

/* add cover image validator */
export const addCoverImage = (data: StoreCoverImageType) => {
    let errors: StoreCoverImageType = <StoreCoverImageType>{}

    if (!data.cover_image || isEmpty(data.cover_image)) {
        errors.cover_image = "Image path is required."
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}