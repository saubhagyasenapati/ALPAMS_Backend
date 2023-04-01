import mongoose from "mongoose";
import dotenv from"dotenv";

dotenv.config({path:"config/config.env"});


export const connectToMongo = async () => {

    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo connected")
    } catch (error) {
        throw error;
    }
}
