import { Request, Response } from "express";
import HomeController from "../controllers/HomeController";
import ScrapeController from "../controllers/ScrapeController";

const express = require('express');
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    let controller = new HomeController(req);
    let response = await controller.getResponse();

    res.send(response);
});

router.get('/scrape', async (req: Request, res: Response) => {
    let controller = new ScrapeController(req);
    let response = await controller.getResponse();

    res.send(response);
});

export = router;
