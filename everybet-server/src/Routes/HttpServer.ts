import { Inject } from "typescript-ioc";
import express from 'express';
import morgan from 'morgan';
import * as bodyParser from 'body-parser';

import BetsController from './Controllers/BetsController';
import AnswersController from './Controllers/AnswersController';
import CategoriesController from './Controllers/CategoriesController';
import UsersController from './Controllers/UsersController';
import MailerController from "./Controllers/MailerController";
import RewardTiersController from "./Controllers/RewardTiersController";
import ImagesController from "./Controllers/ImagesController";
import ServiceClientController from "./Controllers/ServiceClientController";

import { IoCConfiguration } from '../Utils/IoCConfiguration';
import { ServerError } from '../Errors/ServerError';
import { IAuthService } from '../Services/DataBase/Interfaces/IAuthService';
import { ILog } from '../Logs/ILog';
import { IDataBaseService } from "../Services/DataBase/Interfaces/IDataBaseService";

class HttpServerConfiguration {
    @Inject
    private authService: IAuthService;
    @Inject
    private db: IDataBaseService;
    @Inject
    private serverLog: ILog;

    // ref to Express instance
    public app: express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        IoCConfiguration.configure();
        this.app = express();
        this.middleware();
        this.routes();
        this.db.init();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Authentification
        this.app.use(this.authChecker.bind(this));
    }

    // Configure API endpoints.
    private routes(): void {
        // Controllers
        this.app.use('/api/answers', AnswersController);
        this.app.use('/api/categories', CategoriesController);
        this.app.use('/api/bets', BetsController);
        this.app.use('/api/users', UsersController);
        this.app.use('/api/mailer', MailerController);
        this.app.use('/api/rewardTiers', RewardTiersController);
        this.app.use('/api/serviceClient', ServiceClientController);
        this.app.use('/api/images', ImagesController);
        
        // Public folder
        this.app.use('/api', express.static('public'));
        
        // Base route
        let router = express.Router();
        router.all('/:api?', (_req, res) => {res.json({ message: 'Api is running !' });});
        this.app.use('/', router);
    }

    private async authChecker(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            if (!req.url.includes("/api/images") || req.method !== "GET") {
                if (req.headers.authorization === undefined || req.headers.authorization === "" || !req.headers.authorization.includes(" "))
                    throw new ServerError(400, `Bad authentification: Please use bearer token`);
                else {
                    let token = req.headers.authorization.split(" ")[1];
                    await this.authService.checkIfApiTokenExist(token);
                }
            }
            next();
        } catch (e) {
            this.serverLog.error(e.message);
            if (e.name === "ServerError"){
                res.status(e.status);
                res.send({
                    error: e.message,
                });
            }
            else {
                res.status(500);
                res.send({
                    error: e.message,
                });
            }
        }
        
    }
}

export default new HttpServerConfiguration().app;