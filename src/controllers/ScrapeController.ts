import { Request } from "express";
import IRequestController from './IRequestController';
import WebScraper from '../model/scrapers/WebScraper';
import SinaParser from '../model/parsers/SinaParser';
import { postArticles } from '../model/db/dbHelpers';
import AsahiParser from "../model/parsers/AsahiParser";
import ChosunParser from "../model/parsers/ChosunParser";
import NightmareWebScraper from "../model/scrapers/NightmareWebScraper";
import TokyoParser from "../model/parsers/TokyoParser";

class ScrapeController implements IRequestController {
    url: string;
    source: string;

    constructor(public request: Request) {
        this.url = request.body.url;
        this.source = request.body.source;
    }

    public async getResponse() {
        let scraper;
        let pageParser;

        switch (this.source.toUpperCase()) {
            case "ASAHI":
                pageParser = new AsahiParser();
                scraper = new WebScraper();
                break;
            case "SINA":
                pageParser = new SinaParser();
                scraper = new WebScraper();
                break;
            case "CHOSUN":
                pageParser = new ChosunParser();
                scraper = new NightmareWebScraper();
                break;
            case "TOKYO":
                pageParser = new TokyoParser();
                scraper = new WebScraper();
                break;
            default:
                throw new Error("Invalid source specified");
        }

        let pageHtml = await scraper.scrape(this.url);

        // return pageHtml;
        let articles = await pageParser.parse(pageHtml);

        let addedArticles = await postArticles(articles);

        return addedArticles;
    }
}

export default ScrapeController
