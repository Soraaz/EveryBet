"use strict";

const HTTPClient = require("./HTTPClient");
const Common = require('./Common');

class UsersService {

    // POST

    static createNewUser(login, name, email, password, coins) {
        let body = {
            login: login,
            name: name,
            email : email,
            password: password,
            coins: coins
        };
        return HTTPClient.sendPost("users", body);
    }

    static addUserResponse(userId, betId, answerId, coins) {
        let body = {
            userId: userId,
            betId: betId,
            answerId: answerId,
            coins: coins
        };
        return HTTPClient.sendPost("users/answer", body);
    }

    static async dailyRewardByUserId(userId, coins) {
        await this.addCoinsByUserId(userId, coins);
        return await this.updateUserById(userId, "reward", "1");
    }

    static addImagetoUser(userId, img) {
        return HTTPClient.uploadImage("/images/upload/" + userId, img);
    }

    // PUT

    static updateUserById(id, columns, value) {
        let columnsMap = new Map();

        if (Array.isArray(columns) && Array.isArray(value))
            for (let i = 0; i < columns.length - 1; i++)
                columnsMap.set(columns[i], value[i]);
        else
            columnsMap.set(columns, value);
        return HTTPClient.sendPut("users/" + id, Common.parseColumns(columnsMap));
    }

    static updateUsersByFilters(filters, columns) {
        return HTTPClient.sendPut(Common.parseFilters("users", filters), Common.parseColumns(columns));
    }

    static updateAllUsers(columns, value) {
        if (arguments.length === 2) {
            let columnsMap = new Map();
            columnsMap.set(columns, value);
            columns = columnsMap;
        }
        return this.updateUsersByFilters([], columns);
    }

    static addCoinsByUserId(userId, coins) {
        let body = {
            "coins": coins
        };
        return HTTPClient.sendPut("users/" + userId + "/addCoins", body);
    }

    static addCoinsByFilters(filters, coins) {
        let body = {
            "coins": coins
        };
        return HTTPClient.sendPut(Common.parseFilters("users/addCoins", filters), body);
    }

    // DELETE

    static deleteUserById(id) {
        return HTTPClient.sendDelete("users/" + id);
    }

    static deleteUserByFilters(filters) {
        return HTTPClient.sendDelete(Common.parseFilters("users", filters));
    }

    static resetUserResponses(filters) {
        return HTTPClient.sendDelete(Common.parseFilters("users/answer", filters));
    }

    // GET

    static getUserById(id) {
        return HTTPClient.sendGet("users/" + id);
    }

    static getUsersByFilters(filters) {
        return HTTPClient.sendGet(Common.parseFilters("users", filters));
    }

    static getAllUsers() {
        return this.getUsersByFilters([]);
    }

    static getUsersByName(name) {
        let filters = new Map();
        filters.set("name", name);
        return this.getUsersByFilters(filters);
    }

    static getUsersByLogin(login) {
        let filters = new Map();
        filters.set("login", login);
        return this.getUsersByFilters(filters);
    }

    static getUserByEmail(email) {
        let filters = new Map();
        filters.set("email", email);
        return this.getUsersByFilters(filters);
    }
}

module.exports = UsersService;
