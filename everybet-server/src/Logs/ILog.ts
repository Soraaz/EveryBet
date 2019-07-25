export abstract class ILog {
    abstract debug(msg: string, ...supportingData: any[]): void;
    abstract warn(msg: string, ...supportingData: any[]): void;
    abstract error(msg: string, ...supportingData: any[]): void;
    abstract info(msg: string, ...supportingData: any[]): void;
}