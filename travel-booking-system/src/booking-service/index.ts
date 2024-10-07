import express from "express";
import router from "./routes.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use('/api/bookings',router);


const connectDB = async () => {
    try {
        const databaseURI = process.env.MONGODB_URI;
        if(databaseURI) {    
            await mongoose.connect(databaseURI);
        } else {
            console.log("Database URI missing from enviromental variables");
        }
    } catch(error) {
        console.log("Error in Database connection", error);
    }
}

export {app, connectDB};
