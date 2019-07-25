import { CategoryDto } from './../../Dtos/CategoryDto';
import { AnswerDto } from './../../Dtos/AnswerDto';
import { Provides, Inject } from "typescript-ioc";

import { IBetService } from "./Interfaces/IBetService";
import { IDataBaseService } from './Interfaces/IDataBaseService';
import { ServerError } from '../../Errors/ServerError';
import { SqlHelper } from '../../Utils/SqlHelper';
import { ICategoryService } from './Interfaces/ICategoryService';
import { BetCategoryDto } from './../../Dtos/BetCategoryDto';
import { IAnswerService } from "./Interfaces/IAnswerService";

@Provides (IBetService)
export class BetService implements IBetService {
    @Inject
    private db: IDataBaseService;
    @Inject
    private categoryService: ICategoryService;
    @Inject
    private answerService: IAnswerService;

    // POST api/bets
    async addBet(body: Map<string, object>): Promise<object[]> {
        SqlHelper.checkMandatoryProperties("POST api/bets", body, ["bets.name", "answers", "categories"]);
        
        const answers = body.get("answers") as AnswerDto[];
        body.delete("answers");
        const categories = body.get("categories") as CategoryDto[];
        body.delete("categories");
        
        if (await this.db.exist("bets", body))
            return await this.getBets(body);

        const sql = "INSERT INTO bets"
        + SqlHelper.set(body);
        await this.db.execute(sql);
        const bets = await this.getBets(body);
        if (bets.length === 0)
            throw new ServerError(400, `Bad request: Bet has not been correctly added`);
        this.addBetMetadata(bets[0], answers, categories);
        return bets;
    }

    // PUT api/bets/:id?:{filter}
    async updateBet(filter: Map<string, object>, body: Map<string, object>): Promise<object[]> {
        SqlHelper.checkMandatoryProperties("PUT api/bets?:{filter}", body, [], 1);
        
        const sql = "UPDATE bets"
            + SqlHelper.set(body)
            + SqlHelper.where(filter);
        await this.db.execute(sql);
        const bets = await this.getBets(filter);
        if (bets.length <= 0)
            throw new ServerError(400, `Bad request: Can't update this bet because any bet with this filter has/have been found: ${filter}`);
        return bets;
    }
    
    // DELETE api/bets/:id?:{filter}
    async deleteBet(filter: Map<string, object>): Promise<void> {
        let sql = "DELETE FROM bets"
            + SqlHelper.where(filter);
        await this.db.execute(sql);
    }
    
    // GET api/bets/:id?:{filter}
    async getBets(filter: Map<string, object>): Promise<object[]> {
        const sql = "SELECT * FROM bets"
            + SqlHelper.join(filter, ["users_answers.userId"], "users_answers", "betId", "bets", "id")
            + SqlHelper.where(filter);
        let bets: any[] = await this.db.execute(sql);
        return await this.getBetsMetadata(bets);
    }

    // POST api/bets/category
    async addBetCategory(body: Map<string, object>): Promise<BetCategoryDto[]> {
        SqlHelper.checkMandatoryProperties("POST api/bets/category", body, ["bets_categories.categoryId", "bets_categories.betId"]);
        
        if (!(await this.db.exist("bets_categories", body))) {
            const sql = "INSERT INTO bets_categories"
                + SqlHelper.set(body);
            await this.db.execute(sql);
        }
        const result = await this.getBetCategories(body);
        if (result.length === 0)
            throw new ServerError(400, `Bad request: BetCategory has not been correctly added`);
        return result;
    }

    // PUT api/bets/category
    async updateBetCategory(filter: Map<string, object>, body: Map<string, object>): Promise<object[]> {
        SqlHelper.checkMandatoryProperties("PUT api/bets/category", body, [], 1);
        
        const sql = "UPDATE bets_categories"
            + SqlHelper.set(body)
            + SqlHelper.where(filter);
        await this.db.execute(sql);
        const result = await this.getBetCategories(filter);
        if (result.length <= 0)
            throw new ServerError(400, `Bad request: Can't update this betCategory(ies) because any betCategory with this filter has/have been found: ${filter}`);
        return result;
    }

    // DELETE api/bets/category?:{filter}
    async deleteBetCategories(filter: Map<string, object>): Promise<void> {
        let sql = "DELETE FROM bets_categories"
            + SqlHelper.where(filter);
        await this.db.execute(sql);
    }


    // GET api/bets/category?:{filter}
    async getBetCategories(filter: Map<string, object>): Promise<BetCategoryDto[]> {
        const sql = "SELECT * FROM bets_categories"
            + SqlHelper.where(filter);
        return await this.db.execute(sql);
    }

    // Add additional informations in DataBase (answers, categories) to a bet
    private async addBetMetadata(bet: any, answers: AnswerDto[], categories: CategoryDto[]): Promise<void>{
        for (const answer of answers) {
            this.answerService.addAnswer(new Map<string, any>([
                ["answers.betId", `"${bet.id.toString()}"`],
                ["answers.answer", `"${answer.answer}"`]
            ]));
        }
        bet.answers = answers;
        for (const category of categories) {
            this.addBetCategory(new Map<string, any>([
                ["bets_categories.betId", `"${bet.id.toString()}"`],
                ["bets_categories.categoryId", `"${category.id}"`]
            ]));
        }
        bet.categories = categories;
    }

    // Add additional informations (answers, categories) to each bet of the array
    private async getBetsMetadata(bets: any[]): Promise<any[]>{
        for (let bet of bets) {
            bet.answers = await this.answerService.getAnswers(new Map<string, object>([["answers.betId", bet.id.toString()]]));
            bet.categories = [];

            let betsCategories: BetCategoryDto[] = await this.getBetCategories(new Map<string, object>([["bets_categories.betId", bet.id.toString()]]));
            for (let betCategory of betsCategories) {
                bet.categories = bet.categories.concat(await this.categoryService.getCategories(new Map<string, any>([["categories.id", betCategory.categoryId.toString()]])));
            }
            if ("answerId" in bet) {
                let response: AnswerDto = bet.answers.find((answer: { id: string; }) => answer.id === bet.answerId);
                bet.response = response === undefined ? undefined : response.answer;
                delete bet["userId"];
                delete bet["answerId"];
                delete bet["betId"];
            }
        }
        return bets;
    }
}