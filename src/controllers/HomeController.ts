import { Request } from "express";
import IRequestController from './IRequestController';

class HomeController implements IRequestController {
    constructor(public request: Request) {
    }

    public async getResponse() {
        return 'Healthy';
    }
}

export default HomeController
