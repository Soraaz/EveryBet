import { AnswerDto } from './../../Dtos/AnswerDto';
import { Provides, Inject } from "typescript-ioc";

import { IAnswerService } from "./Interfaces/IAnswerService";
import { ServerError } from '../../Errors/ServerError';
import { IDataBaseService } from './Interfaces/IDataBaseService';
import { SqlHelper } from '../../Utils/SqlHelper';

@Provides (IAnswerService)
export class AnswerService implements IAnswerService {
    @Inject
    private db: IDataBaseService;

    // POST api/answers
    async addAnswer(body: Map<string, object>): Promise<object[]> {
        SqlHelper.checkMandatoryProperties("POST api/answers", body, ["answers.answer"]);
        if (await this.db.exist("answers", body))
            return await this.getAnswers(body);

        const sql = "INSERT INTO answers"
            + SqlHelper.set(body);
        await this.db.execute(sql);
        const result = await this.getAnswers(body);
        if (result.length <= 0)
            throw new ServerError(400, `Bad request: Answer has not been added`);
        return result;
    }

    // PUT api/answers/:id?:{filter}
    async updateAnswer(filter: Map<string, object>, body: Map<string, object>): Promise<object[]> {
        SqlHelper.checkMandatoryProperties("PUT api/answers?:{filter}", body, [], 1);
        
        const sql = "UPDATE answers"
            + SqlHelper.set(body)
            + SqlHelper.where(filter);
        await this.db.execute(sql);
        const result = await this.getAnswers(filter);
        if (result.length <= 0)
            throw new ServerError(400, `Bad request: Can't update this answer because any answer with this filter has/have been found: ${filter}`);
        return result;
    }

    // DELETE api/answers/:id?:{filter}
    async deleteAnswer(filter: Map<string, object>): Promise<void> {
        let sql = "DELETE FROM answers"
            + SqlHelper.where(filter);

        await this.db.execute(sql);
    }

    // GET api/answers/:id?:{filter}
    async getAnswers(filter: Map<string, object>): Promise<AnswerDto[]> {
        const sql = "SELECT * FROM answers"
            + SqlHelper.where(filter);
        const result = await this.db.execute(sql);
        return result;
    }
}