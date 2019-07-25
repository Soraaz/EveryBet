"use strict";

const HTTPClient = require("./HTTPClient");
const Common = require('./Common');

class BetsService {

    // POST

    static createNewBet(name, desc, deadline, answersString, categoriesId) {
        let answers = [];
        answersString.forEach(answer => {
            answers.push({
                answer: answer
            });
        });
        let categories = [];
        categoriesId.forEach(category => {
            categories.push({
                id: category
            });
        });
        let body = {
            name: name,
            description: desc,
            deadline: deadline,
            validate: 0,
            answers: answers,
            categories: categories
        };
        return HTTPClient.sendPost("bets", body);
    }

    // PUT

    static updateBetById(id, columns, value) {
        if (arguments.length === 3) {
            let columnsMap = new Map();
            columnsMap.set(columns, value);
            columns = columnsMap;
        }
        return HTTPClient.sendPut("bets/" + id, Common.parseColumns(columns));
    }

    static updateBetsByFilters(filters, columns) {
        return HTTPClient.sendPut(Common.parseFilters("bets", filters), Common.parseColumns(columns));
    }

    static updateAllBets(columns, value) {
        if (arguments.length === 2) {
            let columnsMap = new Map();
            columnsMap.set(columns, value);
            columns = columnsMap;
        }
        return this.updateBetsByFilters([], columns);
    }
    
    static updateBetsByName(name, columns, value) {
        let filters = new Map();
        filters.set("name", name);
        if (arguments.length === 3) {
            let columnsMap = new Map();
            columnsMap.set(columns, value);
            columns = columnsMap;
        }
        return this.updateBetsByFilters(filters, columns);
    }

    // DELETE

    static deleteBetById(id) {
        return HTTPClient.sendDelete("bets/" + id);
    }

    static deleteBetsByFilters(filters) {
        return HTTPClient.sendDelete(Common.parseFilters("bets", filters));
    }

    // GET

    static getBetById(id) {
        return HTTPClient.sendGet("bets/" + id);
    }
    
    static getBetsByFilters(filters) {
        return HTTPClient.sendGet(Common.parseFilters("bets", filters));
    }

    static getAllBets() {
        return this.getBetsByFilters([]);
    }

    static getBetsByName(name) {
        let filters = new Map();
        filters.set("name", name);
        return this.getBetsByFilters(filters);
    }

    static getBetsByUserId(id) {
        let filters = new Map();
        filters.set("userId", id);
        return this.getBetsByFilters(filters);
    }

    static getBetByUserId(userId, betId) {
        let filters = new Map();
        filters.set("userId", userId);
        filters.set("betId", betId);
        return this.getBetsByFilters(filters);
    }

    static getBetsByCategoryId(id) {
        let filters = new Map();
        filters.set("categoryId", id);
        return this.getBetsByFilters(filters);
    }

    static getBetsByDeadline(deadline) {
        let filters = new Map();
        filters.set("deadlineMax", deadline);
        return this.getBetsByFilters(filters);
    }
}

module.exports = BetsService;