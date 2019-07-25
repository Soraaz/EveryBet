export abstract class IServiceClientService {
    abstract addProposition(body: Map<string, object>): Promise<void>;
}
