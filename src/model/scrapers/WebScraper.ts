import IWebScraper from './IWebScraper';
import rp from 'request-promise';

class WebScraper implements IWebScraper {
    constructor() { }

    public async scrape(url: string) {
        let html = rp(url);
        return html;
    }
}

export = WebScraper;