import { Logger, parse, request } from "@miqro/core";
import { AUTH_HEADERS, Endpoint, TBKConfig } from "../../config";
import { inspect } from "util";

export interface SubscribeRequest {
  username: string;
  email: string;
  response_url: string;
}

export interface SubscribeResponse {
  token: string;
  url_webpay: string;
}

const validateRequest = (data: any): SubscribeRequest => {
  return parse("body", data, [
    { name: "username", type: "string", required: true },
    { name: "email", type: "string", required: true },
    { name: "response_url", type: "string", required: true }
  ], "no_extra") as unknown as SubscribeRequest;
};

const validateResponse = (response: any): SubscribeResponse => {
  return parse("response", response, [
    { name: "token", type: "string", required: true },
    { name: "url_webpay", type: "string", required: true }
  ], "no_extra") as unknown as SubscribeResponse;
};

export const subscribe = (config: TBKConfig): Endpoint<SubscribeRequest, SubscribeResponse> =>
  async (body: SubscribeRequest, logger: Logger): Promise<SubscribeResponse> => {
    const data = validateRequest(body);
    logger.info(inspect(data));
    const response = await request({
      url: `${config.environment.host}/rswebpaytransaction/api/oneclick/v1.0/inscriptions`,
      method: "POST",
      headers: AUTH_HEADERS(config),
      data
    });
    logger.info(inspect(response.data));
    return validateResponse(response.data);
  };
