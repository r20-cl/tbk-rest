import { Endpoint, TBKConfig } from "../../config";
export interface InitTransactionRequest {
    username: string;
    tbk_user: string;
    buy_order: string;
    details: {
        commerce_code: string;
        buy_order: string;
        amount: number;
        installments_number: number;
    }[];
}
export interface InitTransactionResponse {
    buy_order: string;
    card_detail: {
        card_number: string;
    };
    accounting_date: string;
    transaction_date: string;
    details: {
        amount: number;
        status: "INITIALIZED" | "AUTHORIZED" | "REVERSED" | "FAILED" | "NULLIFIED" | "PARTIALLY_NULLIFIED" | "CAPTURED";
        authorization_code?: string;
        payment_type_code: "VD" | "VN" | "VC" | "SI" | "S2" | string | "VP";
        response_code: number;
        installments_number: number;
        installments_amount?: number;
        commerce_code: string;
        buy_order: string;
    }[];
}
export declare const initTransaction: (config: TBKConfig) => Endpoint<InitTransactionRequest, InitTransactionResponse>;
