# GoNews
A web scraper for Go news articles, built with NodeJS

# Web Scraper
This component will lie behind a secured endpoint '/scrape', to be run likely daily by some other process. The general process is:
- [x] Download the page's HTML, using a generic 'WebScraper' class
- [x] Process the page into a list of Article datatypes, using a specific implementation of a PageParser (different for each news site, but all take in raw HTML and spit out a list of 'Articles')
2.b. translate the article to English (?)
- [x] Post new articles into our SQL database

# App back-end
This component will serve up the articles from the SQL database (read only) which the web scraper inserts into

# App front-end
This will be a react app which queries the 'app back-end' and serves the results
