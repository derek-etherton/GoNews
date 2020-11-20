import { Request } from "express";
import IRequestController from './IRequestController';
import WebScraper from '../model/scrapers/WebScraper';
import SinaParser from '../model/parsers/SinaParser';
import pool from '../model/db/config';

class HomeController implements IRequestController {
    url: string;

    constructor(public request: Request) {
        this.url = request.body.url;
    }

    public async getResponse() {
        let scraper = new WebScraper();
        let sinaParser = new SinaParser();

        let pageHtml = await scraper.scrape(this.url);
        let articles = sinaParser.parse(pageHtml);

        pool.query('SELECT * FROM articles', (error: any, results: any) => {
            console.log(results);
        });

        return articles;
    }

}

export default HomeController
