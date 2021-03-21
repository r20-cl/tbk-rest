import { Endpoint, TBKConfig } from "../../config";
export interface UnSubscribeRequest {
    tbk_user: string;
    username: string;
}
export declare const unSubscribe: (config: TBKConfig) => Endpoint<UnSubscribeRequest, void>;
