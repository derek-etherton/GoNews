import Article from '../data/Article'
import { translate } from './ParserHelpers';
import BasicPageParser from './BasicPageParser';
import IArticle from '../data/IArticle';

class TokyoParser extends BasicPageParser {
    public source: string;
    public root: string;
    public nation: string;

    constructor() {
        super();
        this.nation = 'Japan';
        this.source = 'Tokyo';
        this.root = 'https://www.tokyo-np.co.jp/';
        this.linksSelector = 'div.content-area > p.detail-ttl > a';
        this.datesSelector = 'p:nth-child(3) > span.detail-info-txt.splid';
    }

    public async constructArticle($: cheerio.Root, linkE: cheerio.Element, dateE: cheerio.Element): Promise<IArticle> {
        let url = this.root + linkE.attribs.href;
        let title = await translate('ja', $(linkE).text());

        let rawDate = $(dateE).text();
        let enDate = await translate('ja', rawDate);

        let date = new Date(enDate);

        return new Article(url, title, this.source, this.nation, date);
    }
}

export = TokyoParser;