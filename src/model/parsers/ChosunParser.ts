import Article from '../data/Article'
import { translate } from './ParserHelpers';
import cheerio from 'cheerio'
import IArticle from '../data/IArticle';
import IPageParser from './IPageParser';

class ChosunParser implements IPageParser {
    public source: string;
    public nation: string;
    private linksSelector: string;
    private author: string | undefined;
    private scrapeDate: Date | undefined;

    constructor() {
        this.nation = 'Korea';
        this.source = 'Chosun';
        this.linksSelector = '.story-feed > a';

        //#main > div:nth-child(7) > div > div > div:nth-child(1) > div > div > div > div.story-card.story-card--art-left.\|.flex.flex--wrap > div.story-card-block.story-card-right.\|.grid__col--sm-9.grid__col--md-9.grid__col--lg-9 > div.story-card-component.story-card__headline-container.\|.text--overflow-ellipsis.text--left > a
    }

    public async parse(html: string): Promise<IArticle[]> {
        const $ = cheerio.load(html);

        let articles = [];

        let links = $(this.linksSelector);

        console.log(links.length);

        this.scrapeDate = new Date($('.nav__masthead-left-date').text());
        this.author = $('.author-card--content-header > font').text();

        let i;
        for (i = 0; i < links.length; i++) {
            let linkE = links[i];

            let article = await this.constructArticle($, linkE);

            articles.push(article)
        }

        return articles;
    }


    public async constructArticle($: cheerio.Root, linkE: cheerio.Element): Promise<IArticle> {
        let url = linkE.attribs.href;
        let title = await translate('ko', $(linkE).text());

        return new Article(url, title, this.source, this.nation, this.scrapeDate, this.author);
    }
}

export = ChosunParser;