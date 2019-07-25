"use strict";

const HTTPClient = require("./HTTPClient");
const Common = require('./Common');

class AnswersService {

    // POST

    static createNewAnswer(answer, betId) {
        let body = {
            answer: answer,
            betId: betId
        };
        return HTTPClient.sendPost("answers", body);
    }

    // PUT

    static updateAnswerById(id, columns, value) {
        if (arguments.length === 3) {
            let columnsMap = new Map();
            columnsMap.set(columns, value);
            columns = columnsMap;
        }
        return HTTPClient.sendPut("answers/" + id, Common.parseColumns(columns));
    }

    static updateAnswersByFilters(filters, columns) {
        return HTTPClient.sendPut(Common.parseFilters("answers", filters), Common.parseColumns(columns));
    }

    static updateAllAnswers(columns, value) {
        if (arguments.length === 2) {
            let columnsMap = new Map();
            columnsMap.set(columns, value);
            columns = columnsMap;
        }
        return this.updateAnswersByFilters([], columns);
    }

    // DELETE

    static deleteAnswerById(id) {
        return HTTPClient.sendDelete("answers/" + id);
    }

    static deleteAnswerByFilters(filters) {
        return HTTPClient.sendDelete(Common.parseFilters("answers", filters));
    }

    // GET

    static getAnswerById(id) {
        return HTTPClient.sendGet("answers/" + id);
    }

    static getAnswersByFilters(filters) {
        return HTTPClient.sendGet(Common.parseFilters("answers", filters));
    }

    static getAllAnswers() {
        return this.getAnswerByFilters([]);
    }

    static getAnswersByBetId(id) {
        let filters = new Map();
        filters.set("betId", id);
        return this.getAnswersByFilters(filters);
    }
}


module.exports = AnswersService;