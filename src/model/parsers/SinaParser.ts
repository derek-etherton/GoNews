import Article from '../data/Article'
import { fudgeDateYear } from './ParserHelpers';
import BasicPageParser from './BasicPageParser';
import IArticle from '../data/IArticle';

class SinaParser extends BasicPageParser {
    public source: string;

    constructor() {
        super();
        this.source = 'Sina';
        this.linksSelector = '.link03 > a';
        this.datesSelector = '.link03 > .link08';
    }

    public constructArticle($: cheerio.Root, linkE: cheerio.Element, dateE: cheerio.Element): IArticle {
        let url = linkE.attribs.href;
        let title = $(linkE).text();

        let rawDate = $(dateE).text();

        let date = new Date(rawDate.slice(1, -1));
        fudgeDateYear(date);

        return new Article(url, title, this.source, date);
    }
}

export = SinaParser;