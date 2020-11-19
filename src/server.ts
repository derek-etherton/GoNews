import express from 'express';

import apiRouter from './routes/api';


const app = express();
const router = express.Router();

const PORT = 8080;

app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});