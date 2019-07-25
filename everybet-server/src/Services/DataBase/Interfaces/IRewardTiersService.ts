import { RewardTiersDto } from "../../../Dtos/RewardTiersDto";

export abstract class IRewardTiersService {
    // GET api/rewardTiers/:id?:{filter}
    abstract getRewardTiers(filter: Map<string, object>): Promise<RewardTiersDto[]>;
}