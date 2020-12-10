import IArticle from "./IArticle";

class Article implements IArticle {
    constructor(public url: string, public title: string,
        public source: string, public nation: string, public date?: Date, public author?: string) { }
}

export = Article;