import { Request, Response } from "express";
import HomeController from "../controllers/HomeController";
import ScrapeController from "../controllers/ScrapeController";
import ArticlesController from "../controllers/ArticlesController";


const express = require('express');
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    let controller = new HomeController(req);
    let response = await controller.getResponse();

    res.send(response);
});

router.get('/articles', async (req: Request, res: Response) => {
    let controller = new ArticlesController(req);
    let response = await controller.getResponse();

    res.send(response);
});

// this endpoint will eventually be secured so only our back-end can trigger a refresh
// (this is important for Google Translate rate limits)
router.get('/scrape', async (req: Request, res: Response) => {
    let controller = new ScrapeController(req);
    let response = await controller.getResponse();

    res.send(response);
});

export = router;
