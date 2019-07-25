import { Router, Request, Response } from 'express';
import { Inject } from "typescript-ioc";

import { ICategoryService } from "../../Services/DataBase/Interfaces/ICategoryService";
import { CategoryDto } from '../../Dtos/CategoryDto';
import { ServerError } from '../../Errors/ServerError';
import { ILog } from '../../Logs/ILog';
import { IDataBaseService } from '../../Services/DataBase/Interfaces/IDataBaseService';
import { BetCategoryDto } from '../../Dtos/BetCategoryDto';

// api/categories
export class CategoriesController {
    public Router: Router;

    @Inject
    private categoryService: ICategoryService;
    @Inject
    private db: IDataBaseService;
    @Inject
    private serverLog: ILog;

    constructor() {
        this.Router = Router();
        this.init();
    }

    public init() {
        this.Router.post('/', this.addCategory.bind(this));
        this.Router.put('/:id*?', this.updateCategory.bind(this));
        this.Router.delete('/:id*?', this.deleteCategory.bind(this));
        this.Router.get('/:id*?', this.getCategories.bind(this));
    }

    // POST api/categories
    public async addCategory(req: Request, res: Response) {
        try {
            let categoryDto = await this.db.prepareFilter(new Map<string, object>([["categories", CategoryDto.GetInstanceWithDefaultValues()]]), new Map(Object.entries(req.body)));
            const result = await this.categoryService.addCategory(categoryDto);

            if (!result)
                throw new ServerError(500, "Category service error when adding a new category.");
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
                res.status(500);
                this.serverLog.debug(e.message),
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // PUT api/categories/:id?:{filter}
    public async updateCategory(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            if (req.params.id)
                filter.set("id", req.params.id);
            filter = await this.db.prepareFilter(new Map<string, object>([["categories", CategoryDto.GetInstanceWithDefaultValues()]]), filter);
            let categoryDto = await this.db.prepareFilter(new Map<string, object>([["categories", CategoryDto.GetInstanceWithDefaultValues()]]), new Map(Object.entries(req.body)));
            const result = await this.categoryService.updateCategory(filter, categoryDto);

            if (!result) 
                throw new ServerError(500, "Category service error when updating a category.");
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
                this.serverLog.error("Error: " + e.message + " / Route: PUT api/categories");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // DELETE api/categories/:id?:{filter}
    public async deleteCategory(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            if (req.params.id)
                filter.set("id", req.params.id);
            filter = await this.db.prepareFilter(new Map<string, object>([["categories", CategoryDto.GetInstanceWithDefaultValues()]]), filter);
            await this.categoryService.deleteCategory(filter);

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
                this.serverLog.error("Error: " + e.message + " / Route: DELETE api/categories");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }

    // GET api/categories/:id?:{filter}
    public async getCategories(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            if (req.params.id)
                filter.set("id", req.params.id);
            filter = await this.db.prepareFilter(new Map<string, object>([["categories", CategoryDto.GetInstanceWithDefaultValues()], ["bets_categories", BetCategoryDto.GetInstanceWithDefaultValues()]]), filter);
            const result = await this.categoryService.getCategories(filter);

            if (!result)
                throw new ServerError(500, "Category service error when getting category(ies)");
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
                this.serverLog.error("Error: " + e.message + " / Route: GET api/categories");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }
}

// Create the CategoriesController, and export its configured Express.Router
const categoriesController = new CategoriesController();
categoriesController.init();

export default categoriesController.Router;