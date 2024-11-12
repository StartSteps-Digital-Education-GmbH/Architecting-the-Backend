import express from 'express';
import router from './flightRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = process.env.FLIGHT_SERVICES_PATH || 3002;

app.use(express.json()); //Vercel is converting requests to json

app.use('/api/flights',router);

const connecDB = async () => {
    try {
        if(process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("Database connected");
        } else {
            console.log("Error in connecting to the DB: No MongoDB_URI provided");
        }
    } catch (error) {
        console.log("Error in connecting to the DB", error)
    }
}


connecDB().then(() => {
    app.listen(PORT, () => {
        console.log("the APP is runing in port 3002")
    }) 
})

export {app, connecDB};