import { Provides, Inject } from "typescript-ioc";

import { IRewardTiersService } from "./Interfaces/IRewardTiersService";
import { RewardTiersDto } from "../../Dtos/RewardTiersDto";
import { IDataBaseService } from "./Interfaces/IDataBaseService";
import { SqlHelper } from "../../Utils/SqlHelper";

@Provides (IRewardTiersService)
export class RewardTiersService implements IRewardTiersService {
    @Inject
    private db: IDataBaseService;

	// GET api/rewardTiers/:id?:{filter}
    async getRewardTiers(filter: Map<string, object>): Promise<RewardTiersDto[]> {
		const sql = "SELECT * FROM reward_tiers"
            + SqlHelper.where(filter);
        return await this.db.execute(sql);
	}
}