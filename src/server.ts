import express from 'express';
import bodyParser from 'body-parser';

import apiRouter from './routes/api';
import indexRouter from './routes/index';

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});