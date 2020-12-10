import Article from '../data/Article'
import { translate } from './ParserHelpers';
import BasicPageParser from './BasicPageParser';
import IArticle from '../data/IArticle';

class DongaParser extends BasicPageParser {
    public source: string;
    public nation: string;

    constructor() {
        super();
        this.nation = 'Korea';
        this.source = 'Donga';
        this.linksSelector = 'div.rightList > a';
        this.datesSelector = 'div.rightList > a > span.tit > font';
    }

    public async constructArticle($: cheerio.Root, linkE: cheerio.Element, dateE: cheerio.Element): Promise<IArticle> {
        let url = linkE.attribs.href;
        let title = await translate('ko', $(linkE).text());

        let rawDate = $(dateE).text();

        let date = new Date(rawDate);

        return new Article(url, title, this.source, this.nation, date);
    }
}

export = DongaParser;