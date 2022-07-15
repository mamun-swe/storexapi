
import { isEmpty } from "../helpers"
import { ProductCreateType, ProductCreateErrorType } from "../types/product"

/* create validator */
export const create = (data: ProductCreateType) => {
    let errors: ProductCreateErrorType = <ProductCreateErrorType>{}

    if (!data.category || isEmpty(data.category)) errors.category = "Category id is required."
    if (!data.title || isEmpty(data.title)) errors.title = "Title is required."
    if (!data.price) errors.price = "Price is required."
    if (!data.quantity) errors.quantity = "Quantity is required."
    if (!data.description || isEmpty(data.description)) errors.description = "Description is required."
    if (!data.image || isEmpty(data.image)) errors.image = "Image path is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}