import { Request } from "express";
import IRequestController from './IRequestController';
import WebScraper from '../model/scrapers/WebScraper';
import PageParser from '../model/parsers/PageParser';

class HomeController implements IRequestController {
    url: string;

    constructor(public request: Request) {
        this.url = request.body.url;
    }

    public async getResponse() {
        let scraper = new WebScraper();
        let parser = new PageParser();

        let pageHtml = await scraper.scrape(this.url);
        let articles = await parser.parse(pageHtml);

        return articles;
    }

}

export default HomeController
