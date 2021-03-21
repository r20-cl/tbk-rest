import { Endpoint, TBKConfig } from "../../config";
export interface CommitTransactionRequest {
    token: string;
}
export interface CommitTransactionResponse {
    buy_order: string;
    session_id: string;
    accounting_date: string;
    transaction_date: string;
    card_detail: {
        card_number: string;
    };
    vci?: string;
    details: {
        authorization_code: string;
        payment_type_code: "VD" | "VN" | "VC" | "SI" | "S2" | string | "VP";
        response_code: string;
        amount: number;
        installments_amount: number;
        installments_number: number;
        commerce_code: string;
        buy_order: string;
        status: "INITIALIZED" | "AUTHORIZED" | "REVERSED" | "FAILED" | "NULLIFIED" | "PARTIALLY_NULLIFIED" | "CAPTURED";
        balance: number;
    }[];
}
export declare const commitTransaction: (config: TBKConfig) => Endpoint<CommitTransactionRequest, CommitTransactionResponse>;
