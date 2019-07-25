import { Router, Request, Response } from 'express';
import { Inject } from "typescript-ioc";

import { IMailerService } from "../../Services/DataBase/Interfaces/IMailerService";
import { ILog } from '../../Logs/ILog';
import { IDataBaseService } from '../../Services/DataBase/Interfaces/IDataBaseService';
import { UserDto } from '../../Dtos/UserDto';
import { UserAnswerDto } from '../../Dtos/UserAnswerDto';

// api/mailer
export class MailerController {
    public Router: Router;

    @Inject
    private _mailerService: IMailerService;
    @Inject
    private db: IDataBaseService;
    @Inject
    private serverLog: ILog;

    constructor() {
        this.Router = Router();
        this.init();
    }

    public init() {
        this.Router.post('/registerConfirmation/:id*?', this.sendRegister.bind(this));
    }

    // POST api/mailer/registerConfirmation/:id
    public async sendRegister(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            if (req.params.id)
                filter.set("id", req.params.id);
            filter = await this.db.prepareFilter(new Map<string, object>([["users", UserDto.GetInstanceWithDefaultValues()], ["users_answers", UserAnswerDto.GetInstanceWithDefaultValues()]]), filter);
            await this._mailerService.sendRegister(filter);

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
                this.serverLog.error("Error: " + e.message + " / Route: POST api/mailer");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }
}

// Create the MailerController, and export its configured Express.Router
const mailerController = new MailerController();
mailerController.init();

export default mailerController.Router;