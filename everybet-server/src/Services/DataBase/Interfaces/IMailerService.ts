export abstract class IMailerService {
    // Sends register by e-mail to every user matching with filter
    abstract sendRegister(filter: Map<string, object>): Promise<void>;
}
