"use strict";

const HTTPClient = require("./HTTPClient");
const Common = require('./Common');

class CategoriesService {

    // POST

    static createNewCategory(name, icon) {
        let body = {
            name: name,
            icon: icon
        };
        return HTTPClient.sendPost("categories", body);
    }

    // PUT

    static updateCategoryById(id, columns, value) {
        if (arguments.length === 3) {
            let columnsMap = new Map();
            columnsMap.set(columns, value);
            columns = columnsMap;
        }
        return HTTPClient.sendPut("Categories/" + id, Common.parseColumns(columns));
    }

    static updateCategoriesByFilters(filters, columns) {
        return HTTPClient.sendPut(Common.parseFilters("Categories", filters), Common.parseColumns(columns));
    }

    static updateAllCategories(columns, value) {
        if (arguments.length === 2) {
            let columnsMap = new Map();
            columnsMap.set(columns, value);
            columns = columnsMap;
        }
        return this.updateCategoriesByFilters([], columns);
    }
    
    static updateCategoriesByName(name, columns, value) {
        let filters = new Map();
        filters.set("name", name);
        if (arguments.length === 3) {
            let columnsMap = new Map();
            columnsMap.set(columns, value);
            columns = columnsMap;
        }
        return this.updateCategoriesByFilters(filters, columns);
    }

    // DELETE

    static deleteCategorieById(id) {
        return HTTPClient.sendDelete("categories/" + id);
    }

    static deleteCategorieByFilters(filters) {
        return HTTPClient.sendDelete(Common.parseFilters("categories", filters));
    }

    // GET

    static getCategoryById(id) {
        return HTTPClient.sendGet("categories/" + id);
    }
    
    static getCategoriesByFilters(filters) {
        return HTTPClient.sendGet(Common.parseFilters("categories", filters));
    }

    static getAllCategories() {
        return this.getCategoriesByFilters([]);
    }

    static getCategoriesByName(name) {
        let filters = new Map();
        filters.set("name", name);
        return this.getCategoriesByFilters(filters);
    }
}

module.exports = CategoriesService;