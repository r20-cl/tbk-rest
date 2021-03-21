import { Logger, parseOptions, request } from "@miqro/core";
import { AUTH_HEADERS, Endpoint, TBKConfig } from "../../config";
import { inspect } from "util";

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

const validateRequest = (data: any): ConfirmSubscriptionRequest => {
  return parseOptions("body", data as any, [
    { name: "token", type: "string", required: true },
  ], "no_extra") as unknown as ConfirmSubscriptionRequest;
};

const validateResponse = (response: any): ConfirmSubscriptionResponse => {
  return parseOptions("response", response as any, [
    { name: "response_code", type: "number", required: true },
    { name: "tbk_user", type: "string", required: true },
    { name: "authorization_code", type: "string", required: true },
    { name: "card_type", type: "string", required: true },
    { name: "card_number", type: "string", required: true }
  ], "no_extra") as unknown as ConfirmSubscriptionResponse;
};

export const confirmSubscription = (config: TBKConfig): Endpoint<ConfirmSubscriptionRequest, ConfirmSubscriptionResponse> =>
  async (body: ConfirmSubscriptionRequest, logger: Logger): Promise<ConfirmSubscriptionResponse> => {
    const data = validateRequest(body);
    logger.info(inspect(data));
    const response = await request({
      url: `${config.environment.host}/rswebpaytransaction/api/oneclick/v1.0/inscriptions/${data.token}`,
      method: "PUT",
      headers: AUTH_HEADERS(config),
      data
    });
    logger.info(inspect(response.data));
    return validateResponse(response.data);
  };
