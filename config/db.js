import mongoose from "mongoose";

export const connectDB = async ()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`Connected to MongoDb: ${conn.connection.host}`)
        
        
    } catch (err) {
        console.log(`Error connecting to MongoDb: ${err.message}` );
        process.exit(1);
        
    }
};