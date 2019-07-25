export abstract class IDataBaseService {
    //Init DB connection
    abstract init(): Promise<void>;
    
    // Execute a mysql request
    abstract execute(sql: string, log?: boolean): Promise<any>;

    // Prepare the filter
    // tables: map with table as key and an instance of the dto with all properties in value
    // filter: filter or body
    abstract prepareFilter(tables: Map<string, object>, filter: Map<string, object>): Promise<Map<string, object>>;

    // Check if an element already exist in a table
    abstract exist(table: string, columns: Map<string, object>): Promise<boolean>;
}