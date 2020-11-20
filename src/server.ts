import express from 'express';
import bodyParser from 'body-parser';

import apiRouter from './routes/api';

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});