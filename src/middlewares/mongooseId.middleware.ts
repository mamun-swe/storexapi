
import { isValidObjectId } from "mongoose"

/* Check validate mongoose ID */
export const isValidMongooseId = (id: string) => {
    if (!isValidObjectId(id)) {
        let error: any = new Error()
        error.status = 400
        throw error
    }
}

