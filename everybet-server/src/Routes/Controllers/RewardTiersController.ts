import { Router, Request, Response } from 'express';
import { Inject } from "typescript-ioc";

import { ServerError } from '../../Errors/ServerError';
import { ILog } from '../../Logs/ILog';
import { IDataBaseService } from '../../Services/DataBase/Interfaces/IDataBaseService';
import { IRewardTiersService } from '../../Services/DataBase/Interfaces/IRewardTiersService';
import { RewardTiersDto } from '../../Dtos/RewardTiersDto';

// api/rewardTiers
export class RewardTiersController {
  public Router: Router;

  @Inject
  private rewardTiersService: IRewardTiersService;
  @Inject
  private db: IDataBaseService;
  @Inject
  private serverLog: ILog;

  constructor() {
      this.Router = Router();
      this.init();
  }

  init() {
    this.Router.get('/:id*?', this.getRewardTiers.bind(this));
  }

  // GET api/rewardTiers/:id?:{filter}
  public async getRewardTiers(req: Request, res: Response) {
    try {
        let filter = new Map<string, object>(Object.entries(req.query));
        if (req.params.id)
            filter.set("id", req.params.id);
        filter = await this.db.prepareFilter(new Map<string, object>([["reward_tiers", RewardTiersDto.GetInstanceWithDefaultValues()]]), filter);
        const result = await this.rewardTiersService.getRewardTiers(filter);

        if (!result)
            throw new ServerError(500, "RewardTiers service error when getting rewardTier(s).");
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
            this.serverLog.error("Error: " + e.message + " / Route: GET api/rewardTiers");
            res.status(500);
            res.send({
                error: "Unhandled error",
            });
        }
    }
  }
}

// Create the rewardTiersController, and export its configured Express.Router
const rewardTiersController = new RewardTiersController();
rewardTiersController.init();

export default rewardTiersController.Router;