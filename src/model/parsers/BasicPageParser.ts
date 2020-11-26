import Article from '../data/Article'
import cheerio from 'cheerio'
import IPageParser from './IPageParser';
import { fudgeDateYear } from './ParserHelpers';
import IArticle from '../data/IArticle';

abstract class BasicPageParser implements IPageParser {
    public source: string;
    public linksSelector!: string;
    public datesSelector!: string;

    constructor() {
        this.source = "Basic";
    }

    public async parse(html: string): Promise<IArticle[]> {
        const $ = cheerio.load(html);

        let articles = [];

        let links = $(this.linksSelector);
        let dates = $(this.datesSelector);

        let i;
        for (i = 0; i < links.length; i++) {
            let linkE = links[i];
            let dateE = dates[i];

            let article = await this.constructArticle($, linkE, dateE);

            articles.push(article)
        }

        return articles;
    }

    public async constructArticle($: cheerio.Root, linkE: cheerio.Element, dateE: cheerio.Element): Promise<IArticle> {
        throw new Error("Class must implement constructArticle");
    }
}

export = BasicPageParser;