
import { isEmpty } from "../helpers"
import { IROrderInput, IROrderUpdateInput } from "../types/order"

/* create validator */
export const create = (data: IROrderInput) => {
    let errors: IROrderInput = <IROrderInput>{}

    if (!data.user || isEmpty(data.user)) errors.user = "User ID is required."
    if (!data.status) errors.status = "Order status is required."
    if (data.status) {
        const isValidType = ["CREATED", "ACCEPTED", "DELIVERED", "CANCELED"]
            .find(item => item === data.status)

        if (!isValidType || isValidType == undefined) {
            errors.status = data.status + " isn't valid."
        }
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

/* update validator */
export const update = (data: IROrderUpdateInput) => {
    let errors: IROrderUpdateInput = <IROrderUpdateInput>{}

    if (!data.status) errors.status = "Order status is required."
    if (data.status) {
        const isValidType = ["CREATED", "ACCEPTED", "DELIVERED", "CANCELED"]
            .find(item => item === data.status)

        if (!isValidType || isValidType == undefined) {
            errors.status = data.status + " isn't valid."
        }
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}