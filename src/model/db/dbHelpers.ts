import Article from '../data/Article'
import pool from './config';

export async function postArticles(articles: Article[]) {
    let totalArticleCount = articles.length

    articles = await trimArticles(articles);

    console.log(`${totalArticleCount - articles.length} articles removed as delta`);

    let articlesAdded = [];
    let numErrors = 0;

    let i;

    for (i = 0; i < articles.length; i++) {
        let article = articles[i];

        let result;

        try {
            result = await insertArticle(article);
            articlesAdded.push(article);
        } catch (error) {
            // ignore psql unique constraint(s) error
            if (error.code !== '23505') {
                console.error(error);
                numErrors++;
            }
        }
    }

    console.log(`Articles added: ${articlesAdded.length} / ${articles.length}\nErrors encountered: ${numErrors}`)

    return articlesAdded;
}

export async function getArticleURLs() {
    let result = await pool.query('SELECT url from articles');
    return result;
}

async function trimArticles(articles: Article[]) {
    let existing = (await getArticleURLs()).rows;

    return articles.filter(article => existing.some((url: string) => article.url === url));
}

async function insertArticle(article: Article) {
    const query = 'INSERT INTO articles (url, title, source, date, author) VALUES($1, $2, $3, $4, $5)';
    const values = [article.url, article.title, article.source, article.date, article.author];

    let result = await pool.query(query, values);

    return result;
}