import mongoose from "mongoose";

/**
 * Establishes a connection to the MongoDB database.
 * 
 * The function attempts to connect to the MongoDB instance specified in the MONGO_URI environment variable.
 * If the connection is successful, it logs a success message to the console.
 * If the connection fails, it logs the error to the console and terminates the process with exit code 1.
 */
export const connectDB = async () => {  
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1); // process code 1 means exit with failure, 0 means success
    }

}