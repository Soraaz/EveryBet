import { Provides } from "typescript-ioc";

import { ILog } from "./ILog";

@Provides (ILog)
export class ServerLog implements ILog {
    public debug(msg: string, ...supportingData: any[]): void {
        this.emitLogMessage("debug", msg, supportingData);
    }

    public warn(msg: string, ...supportingData: any[]): void {
        this.emitLogMessage("warn", msg, supportingData);
    }

    public error(msg: string, ...supportingData: any[]): void {
        this.emitLogMessage("error", msg, supportingData);
    }

    public info(msg: string, ...supportingData: any[]): void {
        this.emitLogMessage("info", msg, supportingData);
    }

    private emitLogMessage(msgType: "debug" | "info" | "warn" | "error", msg: string, supportingDetails: any[]) {
        if (supportingDetails.length > 0) {
            console[msgType](`${msg}\n`, supportingDetails);
        }
        else {
            console[msgType](msg);
        }
    }
}