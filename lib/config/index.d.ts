import { Logger, SimpleMap } from "@miqro/core";
export interface TBKConfig {
    environment: {
        host: string;
    };
    auth: {
        apiKeyId: string;
        apiKeySecret: string;
    };
}
export declare const AUTH_HEADERS: (config: TBKConfig) => SimpleMap<string>;
export declare type Endpoint<T1, T2> = (args: T1, logger: Logger) => Promise<T2>;
