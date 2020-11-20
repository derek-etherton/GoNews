import { Request } from "express";
import IRequestController from './IRequestController';
import WebScraper from '../model/scrapers/WebScraper';
import SinaParser from '../model/parsers/SinaParser';
import { postArticles } from '../model/db/dbHelpers';

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

        let articlesAdded = await postArticles(articles);

        return articlesAdded;
    }

}

export default HomeController
