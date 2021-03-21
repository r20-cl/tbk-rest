import { Logger, parseOptions, request } from "@miqro/core";
import { inspect } from "util";
import { AUTH_HEADERS, Endpoint, TBKConfig } from "../../config";


export interface TransactionStatusRequest {
  token: string;
}

export interface TransactionStatusResponse {
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
    response_code: number;
    amount: number;
    installments_amount?: number;
    installments_number: number;
    commerce_code: string;
    buy_order: string;
    status: "INITIALIZED" | "AUTHORIZED" | "REVERSED" | "FAILED" | "NULLIFIED" | "PARTIALLY_NULLIFIED" | "CAPTURED";
    balance?: number;
  }[];
}


export const transactionStatus = (config: TBKConfig): Endpoint<TransactionStatusRequest, TransactionStatusResponse> => {
  return async (token: TransactionStatusRequest, logger: Logger): Promise<TransactionStatusResponse> => {
    logger.info(`get ${inspect(token)}`);
    parseOptions("token", token as any, [
      { name: "token", type: "string", required: true }
    ], "no_extra");
    const args = {
      url: `${config.environment.host}/rswebpaytransaction/api/webpay/v1.0/transactions/${token.token}`,
      headers: AUTH_HEADERS(config),
      method: "GET"
    };
    const response = await request(args);
    logger.info(`get ${inspect(response.data)}`);
    const result = parseOptions("response", response.data, [
      { name: "buy_order", type: "string", required: true },
      { name: "session_id", type: "string", required: true },
      { name: "accounting_date", type: "string", required: true },
      { name: "transaction_date", type: "string", required: true },
      {
        name: "card_detail", type: "nested", required: true, nestedOptions: {
          mode: "no_extra",
          options: [
            { name: "card_number", type: "string", required: true }
          ]
        }
      },
      { name: "vci", type: "string", required: false },
      {
        name: "details", type: "array", required: true, arrayType: "nested", nestedOptions: {
          mode: "no_extra",
          options: [
            { name: "authorization_code", type: "string", required: true },
            { name: "payment_type_code", type: "string", required: true },
            { name: "response_code", type: "number", required: true, enumValues: ["0", "-1", "-2", "-3", "-4", "-5"] },
            { name: "amount", type: "number", required: true },
            { name: "installments_amount", type: "number", required: false },
            { name: "installments_number", type: "number", required: true },
            { name: "commerce_code", type: "string", required: true },
            { name: "buy_order", type: "string", required: true },
            {
              name: "status",
              type: "string",
              required: true,
              enumValues: ["INITIALIZED", "AUTHORIZED", "REVERSED", "FAILED", "NULLIFIED", "PARTIALLY_NULLIFIED", "CAPTURED"]
            },
            { name: "balance", type: "number", required: false }
          ]
        }
      }
    ], "no_extra");


    return result as unknown as TransactionStatusResponse;
  };
}

