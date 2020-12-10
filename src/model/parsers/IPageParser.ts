import IArticle from '../data/IArticle'

interface IPageParser {
    source: string;
    nation: string;
    parse(html: string): Promise<IArticle[]>;
}

export = IPageParser;