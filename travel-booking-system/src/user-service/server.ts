import express from 'express';
import dotenv from 'dotenv';
import router from './userRoutes.js';
import { AppDataSource } from '../database/ormconfig.js';
dotenv.config();
const app = express();

const connectToSQL  = async () => {
    try{
        await AppDataSource.initialize();
        console.log('SQLite database connect');
    } catch (error) {
        console.log('Error in connecting to DB', error);
    }
}

app.use(express.json());
app.use('/api/users',router);

connectToSQL().then(() => {
    app.listen(3001, ()=> {
        console.log("the User services is running on PORT:3001")
    }
    )
})

export {app, connectToSQL};