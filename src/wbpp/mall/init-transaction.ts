import { Logger, parseOptions, request } from "@miqro/core";
import { AUTH_HEADERS, Endpoint, TBKConfig } from "../../config";
import { inspect } from "util";

export interface InitTransactionRequest {
  buy_order: string;
  session_id: string;
  return_url: string;
  details: { amount: number; commerce_code: string; buy_order: string; }[];
}

export interface InitTransactionResponse {
  token: string;
  url: string;
}

export const initTransaction = (config: TBKConfig): Endpoint<InitTransactionRequest, InitTransactionResponse> => {
  return async (transactions: InitTransactionRequest, logger: Logger): Promise<InitTransactionResponse> => {
    const data = parseOptions("transactions", transactions as any, [
      { name: "buy_order", type: "string", required: true },
      { name: "session_id", type: "string", required: true },
      { name: "return_url", type: "string", required: true },
      {
        name: "details", type: "array", required: true, arrayType: "nested", nestedOptions: {
          mode: "no_extra",
          options: [
            { name: "amount", type: "number", required: true },
            { name: "commerce_code", type: "string", required: true },
            { name: "buy_order", type: "string", required: true }
          ]
        }
      }
    ], "no_extra");
    const requestConfig = {
      url: `${config.environment.host}/rswebpaytransaction/api/webpay/v1.0/transactions`,
      method: "POST",
      headers: AUTH_HEADERS(config),
      data
    };
    logger.info(inspect(requestConfig, {
      depth: 100
    }));
    const response = await request(requestConfig);
    // const response = await request(requestConfig);

    const result = parseOptions("response", response.data, [
      { name: "token", type: "string", required: true },
      { name: "url", type: "string", required: true },
    ], "no_extra");


    return result as unknown as InitTransactionResponse;
  };
}
