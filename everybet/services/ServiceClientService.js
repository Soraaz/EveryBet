"use strict";

const HTTPClient = require("./HTTPClient");

class ServiceClientService {

    static sendMessage(userId, betId, message) {
        let body = {
            userId: userId,
            betId: betId,
            message: message
        };
        return HTTPClient.sendPost("serviceClient", body);
    }
}

module.exports = ServiceClientService;