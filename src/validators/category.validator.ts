
import { isEmpty } from "../helpers"
import { CategoryCreateType } from "../types/category"

/* create validator */
export const create = (data: CategoryCreateType) => {
    let errors: CategoryCreateType = <CategoryCreateType>{}

    if (!data.title || isEmpty(data.title)) errors.title = "Title is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}