
import mongoose from "mongoose"
const PROD_DB_URI: any = process.env.DB_URI
const TEST_DB_URI: any = process.env.TEST_DB_URI
const ENVIRONMENT: any = process.env.ENVIRONMENT

export const databaseConnection = async () => {
    try {
        const DB_URI = ENVIRONMENT === "TEST" ? TEST_DB_URI : PROD_DB_URI
        
        await mongoose.connect(DB_URI, { autoIndex: false })
        console.log("Database connection established.")        
    } catch (error: any) {
        if (error) {
            console.log("Failed to connect database.")
        }
    }
}