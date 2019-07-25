import { Router, Request, Response } from 'express';
import { Inject } from "typescript-ioc";

import { IAnswerService } from "../../Services/DataBase/Interfaces/IAnswerService";
import { AnswerDto } from '../../Dtos/AnswerDto';
import { ServerError } from '../../Errors/ServerError';
import { ILog } from '../../Logs/ILog';
import { IDataBaseService } from '../../Services/DataBase/Interfaces/IDataBaseService';

// api/answers
export class AnswersController {
  public Router: Router;

  @Inject
  private answerService: IAnswerService;
  @Inject
  private db: IDataBaseService;
  @Inject
  private serverLog: ILog;

  constructor() {
      this.Router = Router();
      this.init();
  }

  init() {
    this.Router.post('/', this.addAnswer.bind(this));
    this.Router.put('/:id*?', this.updateAnswer.bind(this));
    this.Router.delete('/:id*?', this.deleteAnswer.bind(this));
    this.Router.get('/:id*?', this.getAnswers.bind(this));
  }

  // POST api/answers
  public async addAnswer(req: Request, res: Response) {
    try {
        let answerDto = await this.db.prepareFilter(new Map<string, object>([["answers", AnswerDto.GetInstanceWithDefaultValues()]]), new Map(Object.entries(req.body)));
        const result = await this.answerService.addAnswer(answerDto);

        if (!result) 
            throw new ServerError(500, "Answer service error when adding a new answer.");
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
            this.serverLog.error("Error: " + e.message + " / Route: POST api/answers");
            res.status(500);
            res.send({
                error: "Unhandled error",
            });
        }
    }
  }

  // PUT api/answers/:id?:{filter}
  public async updateAnswer(req: Request, res: Response) {
    try {
        let filter = new Map<string, object>(Object.entries(req.query));
        if (req.params.id)
            filter.set("id", req.params.id);
        filter = await this.db.prepareFilter(new Map<string, object>([["answers", AnswerDto.GetInstanceWithDefaultValues()]]), filter);
        let answerDto = await this.db.prepareFilter(new Map<string, object>([["answers", AnswerDto.GetInstanceWithDefaultValues()]]), new Map(Object.entries(req.body)));
        const result = await this.answerService.updateAnswer(filter, answerDto);

        if (!result) 
            throw new ServerError(500, "Answer service error when updating a answer.");
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
            this.serverLog.error("Error: " + e.message + " / Route: PUT api/answers");
            res.status(500);
            res.send({
                error: "Unhandled error",
            });
        }
    }
  }

  // DELETE api/answers/:id?:{filter}
  public async deleteAnswer(req: Request, res: Response) {
    try {
        let filter = new Map<string, object>(Object.entries(req.query));
        if (req.params.id)
            filter.set("id", req.params.id);
        filter = await this.db.prepareFilter(new Map<string, object>([["answers", AnswerDto.GetInstanceWithDefaultValues()]]), filter);
        await this.answerService.deleteAnswer(filter);

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
            this.serverLog.error("Error: " + e.message + " / Route: DELETE api/answers");
            res.status(500);
            res.send({
                error: "Unhandled error",
            });
        }
    }
  }
  
  // GET api/answers/:id?:{filter}
  public async getAnswers(req: Request, res: Response) {
    try {
        let filter = new Map<string, object>(Object.entries(req.query));
        if (req.params.id)
            filter.set("id", req.params.id);
        filter = await this.db.prepareFilter(new Map<string, object>([["answers", AnswerDto.GetInstanceWithDefaultValues()]]), filter);
        const result = await this.answerService.getAnswers(filter);

        if (!result)
            throw new ServerError(500, "Answer service error when getting answer(s).");
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
            this.serverLog.error("Error: " + e.message + " / Route: GET api/answers");
            res.status(500);
            res.send({
                error: "Unhandled error",
            });
        }
    }
  }
}

// Create the AnswersController, and export its configured Express.Router
const answersController = new AnswersController();
answersController.init();

export default answersController.Router;