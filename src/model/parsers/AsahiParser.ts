import Article from '../data/Article'
import cheerio from 'cheerio'
import IPageParser from './IPageParser';
import { fudgeDateYear } from './ParserHelpers';

class AsahiParser implements IPageParser {
    public source: string;
    public root: string;

    constructor() {
        this.source = 'Asahi';
        this.root = 'http://www.asahi.com';
    }

    public parse(html: string) {
        const $ = cheerio.load(html);
        let articles = [];

        let links = $('.SectionFst > .List > li > a');
        let dates = $('.SectionFst > .List > li > a > .Time');

        let i;
        for (i = 0; i < links.length; i++) {
            let linkE = links[i];
            let dateE = dates[i];

            let article = this.constructArticle($, linkE, dateE);

            articles.push(article)
        }

        return articles;
    }

    private constructArticle($: cheerio.Root, linkE: cheerio.Element, dateE: cheerio.Element) {
        let url = this.root + linkE.attribs.href;
        let title = $(linkE).text();

        let rawDate = $(dateE).text();

        let date = new Date(rawDate.slice(1, -1));
        fudgeDateYear(date);

        return new Article(url, title, this.source, date);
    }
}

export = AsahiParser;