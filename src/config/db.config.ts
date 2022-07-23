
import mongoose from "mongoose"
const DB_URI: any = process.env.DB_URI

export const databaseConnection = async () => {
    try {
        await mongoose.connect(DB_URI, { autoIndex: false })
        console.log("Database connection established.")
    } catch (error: any) {
        if (error) {
            console.log("Failed to connect database.")
        }
    }
}