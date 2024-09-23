import express from 'express';
import dotenv from 'dotenv';
import router from './userRoutes.js';
import mongoose from 'mongoose';
dotenv.config();
const app = express();
const PORT = process.env.USER_SERVICES_PATH;
app.use(express.json());
app.use('/users', router);
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to the DB");
    }).catch((err) => {
        console.log("Error in connecting to the DB", err);
    });
}
else {
    console.log("Database Server URL not found in .env file");
}
app.listen(PORT, () => {
    console.log(`the user server is open at port: ${PORT}`);
});
