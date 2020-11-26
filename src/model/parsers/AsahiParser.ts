import Article from '../data/Article'
import { fudgeDateYear } from './ParserHelpers';
import BasicPageParser from './BasicPageParser';
import IArticle from '../data/IArticle';

class AsahiParser extends BasicPageParser {
    public source: string;
    public root: string;

    constructor() {
        super();
        this.source = 'Asahi';
        this.root = 'http://www.asahi.com';
        this.linksSelector = '.SectionFst > .List > li > a';
        this.datesSelector = '.SectionFst > .List > li > a > .Time';
    }

    public constructArticle($: cheerio.Root, linkE: cheerio.Element, dateE: cheerio.Element): IArticle {
        let url = this.root + linkE.attribs.href;
        let title = $(linkE).text();

        let rawDate = $(dateE).text();

        let date = new Date(rawDate.slice(1, -1));
        fudgeDateYear(date);

        return new Article(url, title, this.source, date);
    }
}

export = AsahiParser;