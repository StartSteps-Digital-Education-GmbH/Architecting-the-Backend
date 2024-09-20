import express from 'express';
import router from './userRoutes.js';
import mongoose from 'mongoose';
const app = express();
const PORT = 3001; //TODO:move this to an .env file
app.use(express.json());
app.use('/users', router);
mongoose.connect('mongodb+srv://testuser:test1234@education.bsck2.mongodb.net/?retryWrites=true&w=majority&appName=education').then(() => {
    console.log("Connected to the DB");
}).catch((err) => {
    console.log("Error in connecting to the DB", err);
});
app.listen(PORT, () => {
    console.log(`the user server is open at port: ${PORT}`);
});
