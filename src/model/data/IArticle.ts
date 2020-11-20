interface IArticle {
    url: string;
    title: string;
    source: string;
    date?: Date;
    author?: string;
}

export = IArticle;