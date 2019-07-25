import { Provides, Inject } from "typescript-ioc";

import { IAuthService } from "./Interfaces/IAuthService";
import { ServerError } from '../../Errors/ServerError';
import { IDataBaseService } from './Interfaces/IDataBaseService';

@Provides (IAuthService)
export class AuthService implements IAuthService {
    @Inject
    private db: IDataBaseService;

    async checkIfApiTokenExist(token: string): Promise<void> {
        let sql = `SELECT * FROM api_tokens WHERE token='${token}'`;
        const result = await this.db.execute(sql, false);
        if (result.length === 0)
            throw new ServerError(400, `Bad authentification: Invalid token`);
    }
}