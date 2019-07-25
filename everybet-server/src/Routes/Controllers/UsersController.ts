import { Router, Request, Response } from 'express';
import { Inject } from "typescript-ioc";

import { IUserService } from "../../Services/DataBase/Interfaces/IUserService";
import { ServerError } from '../../Errors/ServerError';
import { ILog } from '../../Logs/ILog';
import { IDataBaseService } from '../../Services/DataBase/Interfaces/IDataBaseService';
import { UserDto } from '../../Dtos/UserDto';
import { UserAnswerDto } from '../../Dtos/UserAnswerDto';

// api/users
export class UsersController {
    public Router: Router;

    @Inject
    private userService: IUserService;
    @Inject
    private db: IDataBaseService;
    @Inject
    private serverLog: ILog;

    constructor() {
        this.Router = Router();
        this.init();
    }

    public init() {
        this.Router.put('/:id*?/addCoins', this.addUserCoins.bind(this));

        this.Router.post('/answer', this.addUserAnswer.bind(this));
        this.Router.put('/answer/:id*?', this.updateUserAnswer.bind(this));
        this.Router.delete('/answer', this.deleteUserAnswer.bind(this));
        this.Router.get('/answer', this.getUserAnswers.bind(this));
        
        this.Router.post('/', this.addUser.bind(this));
        this.Router.put('/:id*?', this.updateUser.bind(this));
        this.Router.delete('/:id*?', this.deleteUser.bind(this));
        this.Router.get('/:id*?', this.getUsers.bind(this));
    }

    // POST api/users
    public async addUser(req: Request, res: Response) {
        try {
            let userDto = await this.db.prepareFilter(new Map<string, object>([["users", UserDto.GetInstanceWithDefaultValues()]]), new Map(Object.entries(req.body)));
            const result = await this.userService.addUser(userDto);

            if (!result)
                throw new ServerError(500, "User service error when adding a new user");
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
                this.serverLog.error("Error: " + e.message + " / Route: POST api/users");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // PUT api/users/:id?:{filter}
    public async updateUser(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            if (req.params.id)
                filter.set("id", req.params.id);
            filter = await this.db.prepareFilter(new Map<string, object>([["users", UserDto.GetInstanceWithDefaultValues()]]), filter);
            let userDto = await this.db.prepareFilter(new Map<string, object>([["users", UserDto.GetInstanceWithDefaultValues()]]), new Map(Object.entries(req.body)));
            const result = await this.userService.updateUser(filter, userDto);

            if (!result) 
                throw new ServerError(500, "User service error when updating a user");
            res.status(200);
            res.send(result);
        } catch (e) {
            this.serverLog.error(e.message);
            if (e.name === "ServerError") {
                res.status(e.status);
                res.send({
                    error: e.message,
                });
            }
            else {
                this.serverLog.error("Error: " + e.message + " / Route: PUT api/users");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // DELETE api/users/:id?:{filter}
    public async deleteUser(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            if (req.params.id)
                filter.set("id", req.params.id);
            filter = await this.db.prepareFilter(new Map<string, object>([["users", UserDto.GetInstanceWithDefaultValues()]]), filter);
            await this.userService.deleteUser(filter);

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
                this.serverLog.error("Error: " + e.message + " / Route: DELETE api/users");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // GET api/users/:id?:{filter}
    public async getUsers(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            if (req.params.id)
                filter.set("id", req.params.id);
            filter = await this.db.prepareFilter(new Map<string, object>([["users", UserDto.GetInstanceWithDefaultValues()], ["users_answers", UserAnswerDto.GetInstanceWithDefaultValues()]]), filter);
            const result = await this.userService.getUsers(filter);

            if (!result)
                throw new ServerError(500, "User service error when getting all users");
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
                this.serverLog.error("Error: " + e.message + " / Route: GET api/users");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // PUT api/users/:id?/addCoins
    public async addUserCoins(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            if (req.params.id)
                filter.set("id", req.params.id);
            filter = await this.db.prepareFilter(new Map<string, object>([["users", UserDto.GetInstanceWithDefaultValues()]]), filter);
            let body = await this.db.prepareFilter(new Map<string, object>([["users", UserDto.GetInstanceWithDefaultValues()]]), new Map(Object.entries(req.body)));
            const result = await this.userService.addUserCoins(filter, body);

            if (!result)
                throw new ServerError(500, "User service error when adding coin(s)");
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
                this.serverLog.error("Error: " + e.message + " / Route: POST api/users/answer");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // POST api/users/answer
    public async addUserAnswer(req: Request, res: Response) {
        try {
            let userAnswerDto = await this.db.prepareFilter(new Map<string, object>([["users_answers", UserAnswerDto.GetInstanceWithDefaultValues()]]), new Map(Object.entries(req.body)));
            const result = await this.userService.addUserAnswer(userAnswerDto);

            if (!result)
                throw new ServerError(500, "User service error when getting all users answers");
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
                this.serverLog.error("Error: " + e.message + " / Route: POST api/users/answer");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // PUT api/users/answer/:id?:{filter}
    public async updateUserAnswer(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            if (req.params.id)
                filter.set("id", req.params.id);
            filter = await this.db.prepareFilter(new Map<string, object>([["users_answers", UserAnswerDto.GetInstanceWithDefaultValues()]]), filter);
            let userAnswerDto = await this.db.prepareFilter(new Map<string, object>([["users_answers", UserAnswerDto.GetInstanceWithDefaultValues()]]), new Map(Object.entries(req.body)));
            const result = await this.userService.updateUserAnswer(filter, userAnswerDto);

            if (!result) 
                throw new ServerError(500, "User service error when updating a user answer");
            res.status(200);
            res.send(result);
        } catch (e) {
            this.serverLog.error(e.message);
            if (e instanceof ServerError) {
                res.status(e.status);
                res.send({
                    error: e.message,
                });
            }
            else {
                this.serverLog.error("Error: " + e.message + " / Route: PUT api/users/answer");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // DELETE api/users/answer?:{filter}
    public async deleteUserAnswer(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            filter = await this.db.prepareFilter(new Map<string, object>([["users_answers", UserAnswerDto.GetInstanceWithDefaultValues()]]), filter);
            await this.userService.deleteUserAnswer(filter);

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
                this.serverLog.error("Error: " + e.message + " / Route: DELETE api/users/answer");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // GET api/users/answer?:{filter}
    public async getUserAnswers(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            filter = await this.db.prepareFilter(new Map<string, object>([["users_answers", UserAnswerDto.GetInstanceWithDefaultValues()]]), filter);
            const result = await this.userService.getUserAnswers(filter);

            if (!result)
                throw new ServerError(500, "User service error when getting user answers");
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
                this.serverLog.error("Error: " + e.message + " / Route: GET api/users/answer");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }
}

// Create the UsersController, and export its configured Express.Router
const usersController = new UsersController();
usersController.init();

export default usersController.Router;