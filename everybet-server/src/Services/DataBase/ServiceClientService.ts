import { Provides, Inject } from "typescript-ioc";

import { IServiceClientService } from "./Interfaces/IServiceClientService";
import { SqlHelper } from "../../Utils/SqlHelper";
import { IDataBaseService } from "./Interfaces/IDataBaseService";

@Provides (IServiceClientService)
export class ServiceClientService implements IServiceClientService {
	@Inject
    private _db: IDataBaseService;

    async addProposition(body: Map<string, object>): Promise<void> {
        SqlHelper.checkMandatoryProperties("POST api/serviceClient", body, ["service_client.message"]);

		const sql = "INSERT INTO service_client"
            + SqlHelper.set(body);
        await this._db.execute(sql);
    }
}