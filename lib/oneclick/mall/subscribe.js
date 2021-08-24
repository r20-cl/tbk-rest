"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const core_1 = require("@miqro/core");
const config_1 = require("../../config");
const util_1 = require("util");
const validateRequest = (data) => {
    return core_1.parse("body", data, [
        { name: "username", type: "string", required: true },
        { name: "email", type: "string", required: true },
        { name: "response_url", type: "string", required: true }
    ], "no_extra");
};
const validateResponse = (response) => {
    return core_1.parse("response", response, [
        { name: "token", type: "string", required: true },
        { name: "url_webpay", type: "string", required: true }
    ], "no_extra");
};
const subscribe = (config) => async (body, logger) => {
    const data = validateRequest(body);
    logger.info(util_1.inspect(data));
    const response = await core_1.request({
        url: `${config.environment.host}/rswebpaytransaction/api/oneclick/v1.0/inscriptions`,
        method: "POST",
        headers: config_1.AUTH_HEADERS(config),
        data
    });
    logger.info(util_1.inspect(response.data));
    return validateResponse(response.data);
};
exports.subscribe = subscribe;
