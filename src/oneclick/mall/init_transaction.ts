import { Logger, parseOptions, request } from "@miqro/core";
import { AUTH_HEADERS, Endpoint, TBKConfig } from "../../config";
import { inspect } from "util";

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

const validateRequest = (data: any): InitTransactionRequest => {
  return parseOptions("body", data as any, [
    { name: "username", type: "string", required: true },
    { name: "tbk_user", type: "string", required: true },
    { name: "buy_order", type: "string", required: true },
    {
      name: "details", type: "array", required: true, arrayType: "nested", arrayMinLength: 1, nestedOptions: {
        mode: "no_extra",
        options: [
          { name: "commerce_code", type: "string", required: true },
          { name: "buy_order", type: "string", required: true },
          { name: "amount", type: "number", required: true },
          { name: "installments_number", type: "number", required: true }
        ]
      }
    },
  ], "no_extra") as unknown as InitTransactionRequest;
};

const validateResponse = (response: any): InitTransactionResponse => {
  return parseOptions("response", response as any, [
    { name: "buy_order", type: "string", required: true },
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
    {
      name: "details", type: "array", required: true, arrayType: "nested", nestedOptions: {
        mode: "no_extra",
        options: [
          { name: "authorization_code", type: "string", required: false },
          { name: "payment_type_code", type: "string", required: true },
          { name: "response_code", type: "number", required: true, enumValues: ["0", "-1", "-2", "-3", "-4", "-5"] },
          { name: "amount", type: "number", required: true },
          { name: "installments_number", type: "number", required: true },
          { name: "installments_amount", type: "number", required: false },
          { name: "commerce_code", type: "string", required: true },
          { name: "buy_order", type: "string", required: true },
          {
            name: "status",
            type: "string",
            required: true,
            enumValues: ["INITIALIZED", "AUTHORIZED", "REVERSED", "FAILED", "NULLIFIED", "PARTIALLY_NULLIFIED", "CAPTURED"]
          }
        ]
      }
    }
  ], "no_extra") as unknown as InitTransactionResponse;
};

export const initTransaction = (config: TBKConfig): Endpoint<InitTransactionRequest, InitTransactionResponse> =>
  async (body: InitTransactionRequest, logger: Logger): Promise<InitTransactionResponse> => {
    const data = validateRequest(body);
    logger.info(inspect(data));
    const response = await request({
      url: `${config.environment.host}/rswebpaytransaction/api/oneclick/v1.0/transactions`,
      method: "POST",
      headers: AUTH_HEADERS(config),
      data
    });
    logger.info(inspect(response.data));
    return validateResponse(response.data);
  };
