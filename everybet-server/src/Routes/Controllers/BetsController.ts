import { Router, Request, Response } from 'express';
import { Inject } from "typescript-ioc";

import { IBetService } from "../../Services/DataBase/Interfaces/IBetService";
import { ServerError } from '../../Errors/ServerError';
import { ILog } from '../../Logs/ILog';
import { IDataBaseService } from '../../Services/DataBase/Interfaces/IDataBaseService';
import { BetDto } from '../../Dtos/BetDto';
import { BetCategoryDto } from '../../Dtos/BetCategoryDto';
import { UserAnswerDto } from '../../Dtos/UserAnswerDto';

// api/bets
export class BetsController {
    public Router: Router;
    
    @Inject
    private betService: IBetService;
    @Inject
    private db: IDataBaseService;
    @Inject
    private serverLog: ILog;

    constructor() {
        this.Router = Router();
        this.init();
    }

    public init() {
        this.Router.post('/category', this.addBetCategory.bind(this));
        this.Router.put('/category/:id*?', this.updateBetCategory.bind(this));
        this.Router.delete('/category/:id*?', this.deleteBetCategory.bind(this));
        this.Router.get('/category/:id*?', this.getBetCategories.bind(this));

        this.Router.post('/', this.addBet.bind(this));
        this.Router.put('/:id*?', this.updateBet.bind(this));
        this.Router.delete('/:id*?', this.deleteBet.bind(this));
        this.Router.get('/:id*?', this.getBets.bind(this));
    }
    
    // POST api/bets
    public async addBet(req: Request, res: Response) {
        try {
            let body = new Map(Object.entries(req.body));
            const bet = await this.db.prepareFilter(new Map<string, object>([["bets", BetDto.GetInstanceWithDefaultValues()]]), body);
            const result = await this.betService.addBet(bet);

            if (!result) 
                throw new ServerError(500, "Bet service error when adding a new bet.");
            res.status(200);
            res.send(result);
        } catch (e) {
            this.serverLog.error(e.message);
            if (e.name === "ServerError"){
                res.status(e.status);
                res.send({
                    error: e.message,
                });
            }
            else {
                this.serverLog.error("Error: " + e.message + " / Route: POST api/bets");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // PUT api/bets/:id?:{filter}
    public async updateBet(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            if (req.params.id)
                filter.set("id", req.params.id);
            filter = await this.db.prepareFilter(new Map<string, object>([["bets", BetDto.GetInstanceWithDefaultValues()]]), filter);
            let betDto = await this.db.prepareFilter(new Map<string, object>([["bets", BetDto.GetInstanceWithDefaultValues()]]), new Map(Object.entries(req.body)));
            const result = await this.betService.updateBet(filter, betDto);

            if (!result) 
                throw new ServerError(500, "Bet service error when updating a bet.");
            res.status(200);
            res.send(result);
        } catch (e) {
            this.serverLog.error(e.message);
            if (e.name === "ServerError"){
                res.status(e.status);
                res.send({
                    error: e.message,
                });
            }
            else {
                this.serverLog.error("Error: " + e.message + " / Route: PUT api/bets");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // DELETE api/bets/:id?:{filter}
    public async deleteBet(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            if (req.params.id)
                filter.set("id", req.params.id);
            filter = await this.db.prepareFilter(new Map<string, object>([["bets", BetDto.GetInstanceWithDefaultValues()]]), filter);
            await this.betService.deleteBet(filter);

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
                this.serverLog.error("Error: " + e.message + " / Route: DELETE api/bets");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // GET api/bets/:id?:{filter}
    public async getBets(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            if (req.params.id)
                filter.set("id", req.params.id);
            filter = await this.db.prepareFilter(new Map<string, object>([["bets", BetDto.GetInstanceWithDefaultValues()], ["users_answers", UserAnswerDto.GetInstanceWithDefaultValues()], ["bets_categories", BetCategoryDto.GetInstanceWithDefaultValues()]]), filter);
            const result = await this.betService.getBets(filter);

            if (!result)
                throw new ServerError(500, "Bet service error when getting bet(s).");
            res.status(200)
            .send(result);
        } catch (e) {
            this.serverLog.error(e.message);
            if (e.name === "ServerError"){
                res.status(e.status);
                res.send({
                    error: e.message,
                });
            }
            else {
                this.serverLog.error("Error: " + e.message + " / Route: GET api/bets");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // POST api/bets/category
    public async addBetCategory(req: Request, res: Response) {
        try {
            let betCategoryDto = await this.db.prepareFilter(new Map<string, object>([["bets_categories", BetCategoryDto.GetInstanceWithDefaultValues()]]), new Map(Object.entries(req.body)));
            const result = await this.betService.addBetCategory(betCategoryDto);

            if (!result)
                throw new ServerError(500, "Bet service error when getting betCategory(ies).");
            res.status(200)
            .send(result);
        } catch (e) {
            this.serverLog.error(e.message);
            if (e.name === "ServerError"){
                res.status(e.status);
                res.send({
                    error: e.message,
                });
            }
            else {
                this.serverLog.error("Error: " + e.message + " / Route: POST api/bets/category");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // PUT api/bets/category/:id?:{filter}
    public async updateBetCategory(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            if (req.params.id)
                filter.set("id", req.params.id);
            filter = await this.db.prepareFilter(new Map<string, object>([["bets_categories", BetCategoryDto.GetInstanceWithDefaultValues()]]), filter);
            let betCategoryDto = await this.db.prepareFilter(new Map<string, object>([["bets_categories", BetCategoryDto.GetInstanceWithDefaultValues()]]), new Map(Object.entries(req.body)));
            const result = await this.betService.updateBetCategory(filter, betCategoryDto);

            if (!result) 
                throw new ServerError(500, "Bet service error when updating a betCategory.");
            res.status(200);
            res.send(result);
        } catch (e) {
            this.serverLog.error(e.message);
            if (e instanceof ServerError){
                res.status(e.status);
                res.send({
                    error: e.message,
                });
            }
            else {
                this.serverLog.error("Error: " + e.message + " / Route: PUT api/bets/category");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // DELETE api/bets/category?:{filter}
    public async deleteBetCategory(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            filter = await this.db.prepareFilter(new Map<string, object>([["bets_categories", BetCategoryDto.GetInstanceWithDefaultValues()]]), filter);
            await this.betService.deleteBetCategories(filter);

            res.status(200);
            res.end();
        } catch (e) {
            this.serverLog.error(e.message);
            if (e.name === "ServerError") {
                res.status(e.status);
                res.send({
                    error: e.message,
                });
            }
            else {
                this.serverLog.error("Error: " + e.message + " / Route: DELETE api/bets/category");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // GET api/bets/category?:{filter}
    public async getBetCategories(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            filter = await this.db.prepareFilter(new Map<string, object>([["bets_categories", BetCategoryDto.GetInstanceWithDefaultValues()]]), filter);
            const result = await this.betService.getBetCategories(filter);

            if (!result)
                throw new ServerError(500, "Bets service error when getting betCategory(ies)");
            res.status(200)
            .send(result);
        } catch (e) {
            this.serverLog.error(e.message);
            if (e.name === "ServerError") {
                res.status(e.status);
                res.send({
                    error: e.message,
                });
            }
            else {
                this.serverLog.error("Error: " + e.message + " / Route: GET api/bets/category");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }
}

// Create the BetsController, and export its configured Express.Router
const betsController = new BetsController();
betsController.init();

export default betsController.Router;