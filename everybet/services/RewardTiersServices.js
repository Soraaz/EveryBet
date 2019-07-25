"use strict";

const HTTPClient = require("./HTTPClient");
const Common = require('./Common');

class RewardTiersService {

    static getAllRewardTiers() {
        return HTTPClient.sendGet("/rewardTiers");
    }
}

module.exports = RewardTiersService;