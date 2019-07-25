import { Provides, Inject } from "typescript-ioc";

import { ICategoryService } from "./Interfaces/ICategoryService";
import { ServerError } from '../../Errors/ServerError';
import { IDataBaseService } from './Interfaces/IDataBaseService';
import { SqlHelper } from '../../Utils/SqlHelper';
import { CategoryDto } from "../../Dtos/CategoryDto";

@Provides (ICategoryService)
export class CategoryService implements ICategoryService {
    @Inject
    private db: IDataBaseService;

    // POST api/categories
    async addCategory(body: Map<string, object>): Promise<any> {
        SqlHelper.checkMandatoryProperties("POST api/categories", body, ["categories.id", "categories.name", "categories.icon"]);
        if (await this.db.exist("categories", body))
            return await this.getCategories(body);

        const sql = "INSERT INTO categories"
            + SqlHelper.set(body);
        await this.db.execute(sql);
        const result = await this.getCategories(body);
        if (result.length <= 0)
            throw new ServerError(400, `Bad request: Category has not been correctly added`);
        return result;
    }

    // PUT api/categories/:id?:{filter}
    async updateCategory(filter: Map<string, object>, body: Map<string, object>): Promise<object[]> {
        SqlHelper.checkMandatoryProperties("PUT api/categories?:{filter}", body, [], 1);
        
        const sql = "UPDATE categories"
            + SqlHelper.set(body)
            + SqlHelper.where(filter);
        await this.db.execute(sql);
        const result = await this.getCategories(filter);
        if (result.length <= 0)
            throw new ServerError(400, `Bad request: Can't update this category because any category with this filter has/have been found: ${filter}`);
        return result;
    }

    // DELETE api/categories/:id?:{filter}
    async deleteCategory(filter: Map<string, object>): Promise<void> {
        let sql = "DELETE FROM categories"
            + SqlHelper.where(filter);
        await this.db.execute(sql);
    }

    // GET api/categories/:id?:{filter}
    async getCategories(filter: Map<string, object>): Promise<object[]> {
        const sql = "SELECT * FROM categories"
            + SqlHelper.where(filter);
        const result = await this.db.execute(sql);
        return SqlHelper.cleanResult(result, CategoryDto.GetInstanceWithDefaultValues());
    }
}