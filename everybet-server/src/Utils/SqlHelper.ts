import { ServerError } from '../Errors/ServerError';

export class SqlHelper {
    public static set(values: Map<string, object>, excludeValues: string[] = []): string {
        const query = this.queryConcat(values, ", ", excludeValues);
        if (query !== "")
            return " SET " + query;
        return "";
    }

    public static insert(values: Map<string, object>, excludeValues: string[] = []): string {
        const query = this.queryConcat(values, ", ", excludeValues);
        if (query !== "")
            return " INSERT " + query;
        return "";
    }

    public static where(values: Map<string, object>, excludeValues: string[] = []): string {
        const query = this.queryConcat(values, " AND ", excludeValues);
        if (query !== "")
            return " WHERE " + query;
        return "";
    }

    // order need to be ASC or DESC
    public static orderBy(values: string[], order: string = "ASC"){
        let query: string = "";
        let i: number = 0;

        values.forEach(v => {
            query += v;
            if (++i < values.length)
                query += ", ";
        });
        if (query !== "")
            return ` ORDER BY ${query} ${order}`;
        return "";
    }

    // joinTable: join table
    // joinColumn: join column
    // fromTable: the joined table will be join on the from table
    // fromColumn: column targeted in the fromTable
    public static join(columns: Map<string, object>, conditionColumn: string[],
        joinTable: string, joinColumn: string,
        fromTable: string, fromColumn: string): string {
        if (conditionColumn.length === 0 || conditionColumn.find(s => columns.has(s))) {
            return ` JOIN ${joinTable} ON ${joinTable}.${joinColumn}=${fromTable}.${fromColumn}`;
        }
        return "";
    }

    public static prefixColumnWithTableName(table: string, columns: Map<string, object>, dto: object): Map<string, object> {
        columns.forEach((value: object, key: string) => {
            if (key in dto) {
                const newKey = `${table}.${key}`;
                columns.set(newKey, value);
                columns.delete(key);
            }
        });
        return columns;
    }

    public static checkMandatoryProperties(errorMsgCalledRoute: string, filter: Map<string, object>, mandatories: string[], minimumPropertiesNeeded: number = 0) {
        let missingProperties: string[] = [];

        if (filter.size < minimumPropertiesNeeded)
            throw new ServerError(400, `Bad request: ${errorMsgCalledRoute} => You need at least ${minimumPropertiesNeeded} property(ies)`);
        mandatories.forEach(p => {
            if (!filter.has(p))
                missingProperties.push(p);
        });
        if (missingProperties.length > 0)
            throw new ServerError(400, `Bad request: ${errorMsgCalledRoute} => [${missingProperties}] property(ies) is/are needed`);
    }

    public static cleanResult(result: any[], dto: object): any[] {
        result.forEach(function(b: any) {
            for (let prop in b) {
                if (!(prop in dto))
                    delete b[prop];
            }
        });
        return result;
    }

    public static queryConcat(values: Map<string, object>, separator: string, excludeValues: string[]= []): string {
        let query: string = "";
        let i: number = 0;

        values.forEach((value: object, key: string) => {
            if (excludeValues.includes(key))
                throw new ServerError(400, `Bad request: \"${key}\" is not authorized to be modified`);
            query += `${key}=${value}`;
            if (++i < values.size)
                query += separator;
        });
        return query;
    }
}