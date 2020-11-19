import { Request, Response } from "express";
import HomeController from "../controllers/apiController";

const express = require('express');
const router = express.Router();


router.get('/', (req: Request, res: Response) => {
    let controller = new HomeController(req, res);

    res.send(controller.scrape());
});

export = router;
