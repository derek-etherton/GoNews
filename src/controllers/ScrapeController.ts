import { Request } from "express";
import IRequestController from './IRequestController';
import WebScraper from '../model/scrapers/WebScraper';
import SinaParser from '../model/parsers/SinaParser';
import { postArticles } from '../model/db/dbHelpers';
import AsahiParser from "../model/parsers/AsahiParser";

class ScrapeController implements IRequestController {
    url: string;
    source: string;

    constructor(public request: Request) {
        this.url = request.body.url;
        this.source = request.body.source;
    }

    public async getResponse() {
        let scraper = new WebScraper();
        let pageParser;

        switch (this.source.toUpperCase()) {
            case "ASAHI":
                pageParser = new AsahiParser();
                break;
            case "SINA":
                pageParser = new SinaParser();
                break;
            default:
                throw new Error("Invalid source specified");
        }

        let pageHtml = await scraper.scrape(this.url);
        let articles = await pageParser.parse(pageHtml);

        let addedArticles = await postArticles(articles);

        return addedArticles;
    }
}

export default ScrapeController
