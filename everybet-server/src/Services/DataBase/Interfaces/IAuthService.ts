export abstract class IAuthService {
    // Checks if api token exist
    abstract checkIfApiTokenExist(token: string): Promise<void>;
}
