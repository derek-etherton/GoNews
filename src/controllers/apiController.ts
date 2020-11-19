
import express from 'express'
import { Request, Response } from 'express'
// import RequestPromise from 'request-promise';

class HomeController {
    request: Request;
    response: Response;

    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
    }

    public scrape() {
        return "Hello world";
    }

}

export default HomeController
