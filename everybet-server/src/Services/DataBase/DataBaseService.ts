import { Provides, Inject } from "typescript-ioc";
const mysql = require('mysql2/promise');

import * as Config from '../../../config.json';
import { IDataBaseService } from "./Interfaces/IDataBaseService";
import { ILog } from '../../Logs/ILog';
import { SqlHelper } from '../../Utils/SqlHelper';

@Provides (IDataBaseService)
export class DataBaseService implements IDataBaseService {
    @Inject
    private serverLog: ILog;
    private pool: any;

    public async init(): Promise<void> {
        this.pool = await mysql.createPool({
            host: Config.database.host,
            port: +Config.database.port,
            user: Config.database.user,
            password: Config.database.password,
            database: Config.database.database
        });
    }

    public async execute(sql: string, log?: boolean): Promise<any> {
        try {
            const [rows] = await this.pool.execute(sql);
            if (log === undefined)
                this.serverLog.debug(sql, rows);
            return rows;
        } catch (e) {
            if (log === undefined)
                this.serverLog.debug(sql);
            throw e;
        }
    }

    public async prepareFilter(tables: Map<string, object>, filter: Map<string, object>): Promise<Map<string, object>> {
        await tables.forEach(async (value: object, key: string) => {
            SqlHelper.prefixColumnWithTableName(key, filter, value);
        });
        const a = await this.escapeFilter(filter);
        return a;
    }

    public async exist(table: string, columns: Map<string, object>): Promise<boolean> {
        const sql = `SELECT count(*) AS nbElem FROM ${table} ${SqlHelper.where(columns)}`;
        const result = await this.execute(sql);
        if (result[0].nbElem > 0)
            return true;
        return false;
    }

    private async escapeFilter(filter: Map<string, object>): Promise<Map<string, object>> {
        let escapedFilter = new Map<string, object>();
        await filter.forEach(async (value: object, key: string) => {
            if (Array.isArray(value))
                escapedFilter.set(key, value);
            else
                escapedFilter.set(key, await this.pool.escape(value));
        });
        return escapedFilter;
    }
}