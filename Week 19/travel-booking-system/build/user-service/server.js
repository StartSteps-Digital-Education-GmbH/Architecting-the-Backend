import express from 'express';
import router from './userRoutes.js';
const app = express();
const PORT = 3001;
app.use(express.json());
app.use('/users', router);
app.listen(PORT, () => {
    console.log(`the user server is open at port: ${PORT}`);
});
