import { UserAnswerDto } from './../../Dtos/UserAnswerDto';
import { Provides, Inject } from "typescript-ioc";

import { IUserService } from "./Interfaces/IUserService";
import { ServerError } from '../../Errors/ServerError';
import { IDataBaseService } from './Interfaces/IDataBaseService';
import { SqlHelper } from '../../Utils/SqlHelper';

@Provides (IUserService)
export class UserService implements IUserService {
    @Inject
    private db: IDataBaseService;

    // POST api/users
    async addUser(body: Map<string, object>): Promise<object[]> {
        SqlHelper.checkMandatoryProperties("POST api/users", body, ["users.email"]);
        
        const sql = "INSERT INTO users"
            + SqlHelper.set(body);
        await this.db.execute(sql);
        const users = await this.getUsers(body);
        if (users.length === 0)
            throw new ServerError(400, `Bad request: User has not been correctly added`);
        return users;
    }
    
    // PUT api/users/:id?:{filter}
    async updateUser(filter: Map<string, object>, body: Map<string, object>): Promise<object[]> {
        SqlHelper.checkMandatoryProperties("PUT api/users?:{filter}", body, [], 1);
        
        const sql = "UPDATE users"
            + SqlHelper.set(body)
            + SqlHelper.where(filter);
        await this.db.execute(sql);
        const users = await this.getUsers(filter);
        if (users.length <= 0)
            throw new ServerError(400, `Bad request: Can't update this user because any user with this filter has/have been found: ${filter}`);
        return users;
    }

    // DELETE api/users/:id?:{filter}
    async deleteUser(filter: Map<string, object>): Promise<void> {
        const users = await this.getUsers(filter);
        for (const user of users) {
            await this.deleteUserAnswer(new Map<string, object>([["users_answers.userId", (user as any).id]]));
        }
        const sql = "DELETE FROM users"
            + SqlHelper.where(filter);
        await this.db.execute(sql);
    }

    // GET api/users/:id?:{filter}
    async getUsers(filter: Map<string, object>): Promise<object[]> {
        const sql = "SELECT * FROM users"
            + SqlHelper.join(filter, [], "reward_tiers", "tier", "users", "rewardTier")
            + SqlHelper.where(filter)
            + SqlHelper.orderBy(["users.coins"], "DESC");
        return await this.db.execute(sql);
    }

    // PUT api/users/:id?/addCoins
    async addUserCoins(filter: Map<string, object>, body: Map<string, object>): Promise<object[]> {
        SqlHelper.checkMandatoryProperties("PUT api/users/:id?/addCoins", body, ["users.coins"]);
        const sql = "UPDATE users SET"
            + ` users.coins = users.coins + ${body.get("users.coins")}`
            + SqlHelper.where(filter);
        await this.db.execute(sql);
        return await this.getUsers(filter);
    }

    // POST api/users/answer
    async addUserAnswer(body: Map<string, object>): Promise<UserAnswerDto[]> {
        SqlHelper.checkMandatoryProperties("POST api/users/answer", body, ["users_answers.userId", "users_answers.answerId", "users_answers.betId"]);
        
        if (!(await this.db.exist("users_answers", body))) {
            const sql = "INSERT INTO users_answers"
                + SqlHelper.set(body);
            await this.db.execute(sql);
        }
        const result = await this.getUserAnswers(body);
        if (result.length === 0)
            throw new ServerError(400, `Bad request: UserAnswer has not been correctly added`);
        return result;
    }

    // PUT api/users/answer/:id?:{filter}
    async updateUserAnswer(filter: Map<string, object>, body: Map<string, object>): Promise<object[]> {
        SqlHelper.checkMandatoryProperties("PUT api/users/answer?:{filter}", body, [], 1);
        
        const sql = "UPDATE users_answers"
            + SqlHelper.set(body)
            + SqlHelper.where(filter);
        await this.db.execute(sql);
        const result = await this.getUserAnswers(filter);
        if (result.length <= 0)
            throw new ServerError(400, `Bad request: Can't update this userAnswer because any useruserAnswer with this filter has/have been found: ${filter}`);
        return result;
    }

    // DELETE api/users/answer?:{filter}
    async deleteUserAnswer(filter: Map<string, object>): Promise<void> {
        let sql = "DELETE FROM users_answers"
            + SqlHelper.where(filter);
        await this.db.execute(sql);
    }

    // GET api/users/answer?:{filter}
    async getUserAnswers(filter: Map<string, object>): Promise<UserAnswerDto[]> {
        const sql = "SELECT * FROM users_answers"
            + SqlHelper.where(filter);
        return await this.db.execute(sql);
    }
}
