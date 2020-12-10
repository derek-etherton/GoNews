
import Nightmare from 'nightmare';
import IWebScraper from './IWebScraper';

class NightmareWebScraper implements IWebScraper {
    private nightmare: Nightmare;

    constructor() {
        this.nightmare = new Nightmare({ show: true });
    }

    public async scrape(url: string) {
        console.log(`Scraping ${url}`);

        let result = await this.nightmare
            .goto(url)
            .wait('.story-card-wrapper > .story-card > .story-card-block > .story-card-component.story-card__headline-container > a')
            .evaluate(() => {
                let body = document.querySelector('#fusion-app');
                if (body) {
                    return body.innerHTML;
                } else {
                    return null;
                };
            })
            .end();

        return String(result);
    }
}

export = NightmareWebScraper;