import {Logger, SimpleMap} from "@miqro/core";

export interface TBKConfig {
  environment: {
    host: string;
  };
  auth: {
    apiKeyId: string;
    apiKeySecret: string;
  }
}

export const AUTH_HEADERS = (config: TBKConfig): SimpleMap<string> => {
  return {
    "Tbk-Api-Key-Id": config.auth.apiKeyId,
    "Tbk-Api-Key-Secret": config.auth.apiKeySecret,
    "Content-Type": "application/json"
  };
};

export type Endpoint<T1, T2> = (args: T1, logger: Logger) => Promise<T2>;
