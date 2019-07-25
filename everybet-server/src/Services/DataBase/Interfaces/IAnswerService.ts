import { AnswerDto } from './../../../Dtos/AnswerDto';

export abstract class IAnswerService {
    // POST api/answers
    abstract addAnswer(body: Map<string, object>): Promise<object[]>;
    // PUT api/answers/:id?:{filter}
    abstract updateAnswer(filter: Map<string, object>, body: Map<string, object>): Promise<object[]>;
    // DELETE api/answers/:id?:{filter}
    abstract deleteAnswer(filter: Map<string, object>): Promise<void>;
    // GET api/answers/:id?:{filter}
    abstract getAnswers(filter: Map<string, object>): Promise<AnswerDto[]>;
}
