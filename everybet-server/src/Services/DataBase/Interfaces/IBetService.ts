import { BetCategoryDto } from "../../../Dtos/BetCategoryDto";

export abstract class IBetService {
    // POST api/bets
    abstract addBet(body: Map<string, object>): Promise<object[]>;
    // PUT api/bets/:id?:{filter}
    abstract updateBet(filter: Map<string, object>, body: Map<string, object>): Promise<object[]>;
    // DELETE api/bets/:id?:{filter}
    abstract deleteBet(filter: Map<string, object>): Promise<void>;
    // GET api/bets/:id?:{filter}
    abstract getBets(filter: Map<string, object>): Promise<object[]>;

    // POST api/bets/category
    abstract addBetCategory(body: Map<string, object>): Promise<BetCategoryDto[]>;
    // PUT api/bets/category
    abstract updateBetCategory(filter: Map<string, object>, body: Map<string, object>): Promise<object[]>;
    // DELETE api/bets/category?:{filter}
    abstract deleteBetCategories(filter: Map<string, object>): Promise<void>;
    // GET api/bets/category?:{filter}
    abstract getBetCategories(filter: Map<string, object>): Promise<BetCategoryDto[]>;
}