import Article from '../data/Article'
import cheerio from 'cheerio'
import IPageParser from './IPageParser';

class SinaParser implements IPageParser {
    public source: string

    constructor() {
        this.source = "Sina";
    }

    public parse(html: string) {
        const $ = cheerio.load(html);

        let articles = [];

        let links = $('.link03 > a');
        let dates = $('.link03 > .link08');

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
        let url = linkE.attribs.href;
        let title = $(linkE).text();

        let rawDate = $(dateE).text();

        let date = new Date(rawDate.slice(1, -1));

        return new Article(url, title, this.source, date);
    }
}

export = SinaParser;