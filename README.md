# GoNews
A web scraper for Go news articles, built with NodeJS

# First Release

This app will run a daily job which scrapes numberous news sites for new go-related articles. The rough process will be:
1. Download the page's HTML, using a generic 'WebScraper' class
2. Process the page into a list of Article datatypes, using a specific implementation of a PageParser (different for each news site, but all take in raw HTML and spit out a list of 'Articles')
2.a. translate the article to English (?)
3. Post new articles into our SQL database

