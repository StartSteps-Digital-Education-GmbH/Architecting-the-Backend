import express from 'express';
import router from './flightRoutes.js';
import {AppDataSource} from '../database/ormconfig.js' 
import dotenv from 'dotenv';

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
app.use('/api/flights',router);

connectToSQL().then(() => {
    app.listen(3002, ()=> {
        console.log("the Flight services is running on PORT:3002")
    }
    )
})



export {app, connectToSQL };