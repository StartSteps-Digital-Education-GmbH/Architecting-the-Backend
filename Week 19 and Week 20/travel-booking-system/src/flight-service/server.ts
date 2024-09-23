import express from 'express';
import router from './flightRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = process.env.FLIGHT_SERVICES_PATH || 3002;

app.use(express.json());
app.use('/flights',router);

if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to the DB")
    }).catch((err) => {
        console.log("Error in connecting to the DB", err)
    });
}

app.listen(PORT, () => {
    console.log(`the flight server is open at port: ${PORT}`)
})