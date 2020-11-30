import { Request } from "express";
import IRequestController from './IRequestController';
import { getArticles } from '../model/db/dbHelpers';

class ArticlesController implements IRequestController {
    private page: number;

    constructor(public request: Request) {
        if (request.body.page) {
            this.page = request.body.page;
        } else {
            this.page = 0;
        }
    }

    public async getResponse() {
        return (await getArticles(this.page * 20)).rows;
    }
}

export default ArticlesController
