import IArticle from '../data/IArticle'

interface IPageParser {
    parse(html: string): IArticle[];
}

export = IPageParser;