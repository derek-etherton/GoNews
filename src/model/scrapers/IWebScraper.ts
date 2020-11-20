interface IWebScraper {
    scrape(url: string): Promise<string>;
}

export = IWebScraper;