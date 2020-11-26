import IArticle from '../data/IArticle'

interface IPageParser {
    source: string;
    parse(html: string): Promise<IArticle[]>;
}

export = IPageParser;