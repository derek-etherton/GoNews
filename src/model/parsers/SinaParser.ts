import Article from '../data/Article'
import { fudgeDateYear, translate } from './ParserHelpers';
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

    public async constructArticle($: cheerio.Root, linkE: cheerio.Element, dateE: cheerio.Element): Promise<IArticle> {
        let url = linkE.attribs.href;
        let title = await translate('zh', $(linkE).text());

        let rawDate = $(dateE).text();

        let date = new Date(rawDate.slice(1, -1));
        fudgeDateYear(date);

        return new Article(url, title, this.source, date);
    }
}

export = SinaParser;