import Article from '../data/Article'
import { translate } from './ParserHelpers';
import cheerio from 'cheerio'
import IArticle from '../data/IArticle';
import IPageParser from './IPageParser';

class ChosunParser implements IPageParser {


    public source: string;
    public nation: string;
    private linksSelector: string;
    public root: string;
    private scrapeDate: Date | undefined;

    constructor() {
        this.nation = 'Korea';
        this.source = 'Chosun';
        this.linksSelector = '.story-card-wrapper > .story-card > .story-card-block > .story-card-component.story-card__headline-container > a';
        this.root = 'https://www.chosun.com';

        this.scrapeDate = new Date();
        //#main > div:nth-child(7) > div > div > div:nth-child(1) > div > div > div > div.story-card.story-card--art-left.\|.flex.flex--wrap > div.story-card-block.story-card-right.\|.grid__col--sm-9.grid__col--md-9.grid__col--lg-9 > div.story-card-component.story-card__headline-container.\|.text--overflow-ellipsis.text--left > a
    }

    public async parse(html: string): Promise<IArticle[]> {
        const $ = cheerio.load(html);

        let articles = [];

        let links = $(this.linksSelector);

        let i;
        for (i = 0; i < links.length; i++) {
            let linkE = links[i];

            let article = await this.constructArticle($, linkE);

            articles.push(article)
        }

        return articles;
    }


    public async constructArticle($: cheerio.Root, linkE: cheerio.Element): Promise<IArticle> {
        let url = this.root + linkE.attribs.href;
        let title = await translate('ko', $(linkE).text());

        // Titles often contain both Chinese and Korean, so we translate twice...
        title = await translate('zh', title);

        return new Article(url, title, this.source, this.nation, this.scrapeDate);
    }
}

export = ChosunParser;