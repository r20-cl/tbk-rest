import { Endpoint, TBKConfig } from "../../config";
export interface ConfirmSubscriptionRequest {
    token: string;
}
export interface ConfirmSubscriptionResponse {
    response_code: number;
    tbk_user: string;
    authorization_code: string;
    card_type: string;
    card_number: string;
}
export declare const confirmSubscription: (config: TBKConfig) => Endpoint<ConfirmSubscriptionRequest, ConfirmSubscriptionResponse>;
