import { Logger, parse, request } from "@miqro/core";
import { AUTH_HEADERS, Endpoint, TBKConfig } from "../../config";
import { inspect } from "util";

export interface UnSubscribeRequest {
  tbk_user: string;
  username: string;
}

const validateRequest = (data: any): UnSubscribeRequest => {
  return parse("body", data, [
    { name: "tbk_user", type: "string", required: true },
    { name: "username", type: "string", required: true }
  ], "no_extra") as unknown as UnSubscribeRequest;
};

const validateResponse = (response: any): void => {
  parse("response", response, [], "no_extra");
};

export const unSubscribe = (config: TBKConfig): Endpoint<UnSubscribeRequest, void> =>
  async (body: UnSubscribeRequest, logger: Logger): Promise<void> => {
    const data = validateRequest(body);
    logger.info(inspect(data));
    const response = await request({
      url: `${config.environment.host}/rswebpaytransaction/api/oneclick/v1.0/inscriptions`,
      method: "DELETE",
      headers: AUTH_HEADERS(config),
      data
    });
    logger.info(inspect(response.data));
    return validateResponse(response.data);
  };

