import express from 'express';
import router from './flightRoutes.js';
const app = express();
const PORT = 3002;
app.use(express.json());
app.use('/flights', router);
app.listen(PORT, () => {
    console.log(`the flight server is open at port: ${PORT}`);
});
