import { ServiceClientDto } from './../../Dtos/ServiceClientDto';
import { Router, Request, Response } from 'express';
import { Inject } from "typescript-ioc";

import { IServiceClientService } from '../../Services/DataBase/Interfaces/IServiceClientService';
import { IDataBaseService } from '../../Services/DataBase/Interfaces/IDataBaseService';
import { ILog } from '../../Logs/ILog';

// api/mailer
export class ServiceClientController {
    public Router: Router;

    @Inject
    private _serviceClientService: IServiceClientService;
    @Inject
    private _db: IDataBaseService;
    @Inject
    private serverLog: ILog;

    constructor() {
        this.Router = Router();
        this.init();
    }

    public init() {
        this.Router.post('/', this.addProposition.bind(this));
    }

    // POST api/serviceClient
    public async addProposition(req: Request, res: Response) {
        try {
            let body = new Map(Object.entries(req.body));
            const proposition = await this._db.prepareFilter(new Map<string, object>([["service_client", ServiceClientDto.GetInstanceWithDefaultValues()]]), body);
            await this._serviceClientService.addProposition(proposition);

            res.status(200);
            res.end();
        } catch (e) {
            this.serverLog.error(e.message);
            if (e.name === "ServerError"){
                res.status(e.status);
                res.send({
                    error: e.message,
                });
            }
            else {
                this.serverLog.error("Error: " + e.message + " / Route: POST api/serviceClient");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }
}

// Create the ServiceClientController, and export its configured Express.Router
const serviceClientController = new ServiceClientController();
serviceClientController.init();

export default serviceClientController.Router;