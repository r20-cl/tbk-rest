import { Endpoint, TBKConfig } from "../../config";
export interface InitTransactionRequest {
    buy_order: string;
    session_id: string;
    return_url: string;
    details: {
        amount: number;
        commerce_code: string;
        buy_order: string;
    }[];
}
export interface InitTransactionResponse {
    token: string;
    url: string;
}
export declare const initTransaction: (config: TBKConfig) => Endpoint<InitTransactionRequest, InitTransactionResponse>;
