import { Logger, parseOptions, request } from "@miqro/core";
import { AUTH_HEADERS, Endpoint, TBKConfig } from "../../config";
import { inspect } from "util";

export interface RefundTransactionRequest {
  commerce_code: string;
  buy_order: string;
  amount: number;
  token: string;
}

export interface RefundTransactionReponse {
  type: "NULLIFIED" | "REVERSED",
  authorization_code?: string;
  authorization_date?: string;
  balance?: number;
  nullified_amount?: number;
  response_code?: number;
}

const validateRequest = (data: any): RefundTransactionRequest => {
  return parseOptions("body", data, [
    { name: "commerce_code", type: "string", required: true },
    { name: "buy_order", type: "string", required: true },
    { name: "token", type: "string", required: true },
    { name: "amount", type: "number", required: true }
  ], "no_extra") as unknown as RefundTransactionRequest;
};

const validateResponse = (response: any): RefundTransactionReponse => {
  return parseOptions("response", response, [
    { name: "type", type: "enum", required: true, enumValues: ["NULLIFIED", "REVERSED"] },
    { name: "authorization_code", type: "string", required: false },
    { name: "authorization_date", type: "string", required: false },
    { name: "nullified_amount", type: "number", required: false },
    { name: "balance", type: "number", required: false },
    { name: "response_code", type: "number", required: false }
  ], "no_extra") as unknown as RefundTransactionReponse;
};

export const refundTransaction = (config: TBKConfig): Endpoint<RefundTransactionRequest, RefundTransactionReponse> =>
  async (body: RefundTransactionRequest, logger: Logger): Promise<RefundTransactionReponse> => {
    const data = validateRequest(body);
    const args = {
      url: `${config.environment.host}/rswebpaytransaction/api/webpay/v1.0/transactions/${data.token}/refunds`,
      method: "POST",
      headers: AUTH_HEADERS(config),
      data: {
        commerce_code: data.commerce_code,
        buy_order: data.buy_order,
        amount: data.amount,
      }
    };
    logger.info(`refund ${inspect(args)}`);
    const response = await request(args);
    logger.info(`refund response ${inspect(response.data)}`);
    return validateResponse(response.data);
  };

