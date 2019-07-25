import { UserAnswerDto } from './../../../Dtos/UserAnswerDto';

export abstract class IUserService {
    // POST api/users
    abstract addUser(body: Map<string, object>): Promise<object[]>;
    // PUT api/users/:id?:{filter}
    abstract updateUser(filter: Map<string, object>, body: Map<string, object>): Promise<object[]>;
    // DELETE api/users/:id?:{filter}
    abstract deleteUser(filter: Map<string, object>): Promise<void>;
    // GET api/users/:id?:{filter}
    abstract getUsers(filter: Map<string, object>): Promise<object[]>;
    
    // PUT api/users/:id?/addCoins
    abstract addUserCoins(filter: Map<string, object>, body: Map<string, object>): Promise<object[]>;

    // POST api/users/answer
    abstract addUserAnswer(body: Map<string, object>): Promise<UserAnswerDto[]>;
    // PUT api/users/answer/:id?:{filter}
    abstract updateUserAnswer(filter: Map<string, object>, body: Map<string, object>): Promise<object[]>;
    // DELETE api/users/answer?:{filter}
    abstract deleteUserAnswer(filter: Map<string, object>): Promise<void>;
    // GET api/users/answer?:{filter}
    abstract getUserAnswers(filter: Map<string, object>): Promise<UserAnswerDto[]>;
}