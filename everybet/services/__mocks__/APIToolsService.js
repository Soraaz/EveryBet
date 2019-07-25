"use strict";

class APIToolsService {
    static getUrl = jest.fn().mockReturnValue(new Promise(async (resolve) => {
        resolve();
    }));
}

module.exports = APIToolsService;
