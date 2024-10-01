import express from 'express';
import router from './flightRoutes.js';
import {AppDataSource} from '../database/ormconfig.js' 
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use('/api/flights',router);

const connectToSQL  = async () => {
    try{
        await AppDataSource.initialize();
        console.log('SQLite database connect');
    } catch (error) {
        console.log('Error in connecting to DB', error);
    }
}

export {app, connectToSQL };