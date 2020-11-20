import { Request } from "express";

interface IRequestController {
    request: Request;
    getResponse(): any;
}

export = IRequestController;