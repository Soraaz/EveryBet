"use strict";

const HTTPClient = require("./HTTPClient");
const Common = require('./Common');

class MailerService {

    static sendRegistrationMail(filters) {
        return HTTPClient.sendPost(Common.parseFilters("mailer/registerConfirmation", filters));
    }

    static sendRegistrationByEmail(email) {
        let filters = new Map();
        filters.set("email", email);
        return HTTPClient.sendPost(Common.parseFilters("mailer/registerConfirmation", filters));
    }
}

module.exports = MailerService;