const express = require('express');
const indexRouter = express.Router();

/** Serve static React content */
indexRouter.use(express.static('public/dist'));

export = indexRouter;