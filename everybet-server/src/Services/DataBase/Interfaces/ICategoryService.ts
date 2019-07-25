export abstract class ICategoryService {
    // POST api/categories
    abstract addCategory(body: Map<string, object>): Promise<any>;
    // PUT api/categories/:id?:{filter}
    abstract updateCategory(filter: Map<string, object>, body: Map<string, object>): Promise<object[]>;
    // DELETE api/categories/:id?:{filter}
    abstract deleteCategory(filter: Map<string, object>): Promise<void>;
    // GET api/categories/:id?:{filter}
    abstract getCategories(filter: Map<string, object>): Promise<object[]>;
}