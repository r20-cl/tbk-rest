import { Endpoint, TBKConfig } from "../../config";
export interface SubscribeRequest {
    username: string;
    email: string;
    response_url: string;
}
export interface SubscribeResponse {
    token: string;
    url_webpay: string;
}
export declare const subscribe: (config: TBKConfig) => Endpoint<SubscribeRequest, SubscribeResponse>;
