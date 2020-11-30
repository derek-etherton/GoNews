import { QueryResult } from 'pg';
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
            // ignore psql unique constraint error
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

export async function getArticles(offset: number) {
    let result = await pool.query('SELECT * from articles order by date desc offset $1 limit 20', [offset]);
    return result;
}

async function trimArticles(articles: Article[]) {
    let existing = (await getArticleURLs()).rows;

    return articles.filter(article => {
        let i;
        for (i = 0; i < existing.length; i++) {
            if (existing[i].url === article.url) {
                return false;
            }
        }
        return true;
    });
}

async function insertArticle(article: Article) {
    const query = 'INSERT INTO articles (url, title, source, date, author) VALUES($1, $2, $3, $4, $5)';
    const values = [article.url, article.title, article.source, article.date, article.author];

    let result = await pool.query(query, values);

    return result;
}