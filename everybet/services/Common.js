"use strict";

class Common {
    static parseFilters(url, filters) {
        let i = 0;
        filters.forEach((value, key) => {
            if (i === 0)
                url += "?";
            i++;
            url += key + "=" + value;
            if (i < filters.size) {
                url += "&";
            }
        });
        return url;
    }

    static parseColumns(columns) {
        let body = {};
        columns.forEach((value, key) => {
            body[key] = value;
        });
        return body;
    }
}

module.exports = Common;