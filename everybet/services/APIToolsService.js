"use strict";

const config = require('../config.json');

class APIToolsService {

    static getUrl() {
        return config.apiServerURL + "api/"
    }
}

module.exports = APIToolsService;