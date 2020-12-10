interface IArticle {
    url: string;
    title: string;
    source: string;
    nation: string;
    date?: Date;
    author?: string;
}

export = IArticle;