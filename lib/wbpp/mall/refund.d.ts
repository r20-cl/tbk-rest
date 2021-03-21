import { Endpoint, TBKConfig } from "../../config";
export interface RefundTransactionRequest {
    commerce_code: string;
    buy_order: string;
    amount: number;
    token: string;
}
export interface RefundTransactionReponse {
    type: "NULLIFIED" | "REVERSED";
    authorization_code?: string;
    authorization_date?: string;
    balance?: number;
    nullified_amount?: number;
    response_code?: number;
}
export declare const refundTransaction: (config: TBKConfig) => Endpoint<RefundTransactionRequest, RefundTransactionReponse>;
