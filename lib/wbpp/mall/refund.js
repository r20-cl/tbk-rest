"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundTransaction = void 0;
const core_1 = require("@miqro/core");
const config_1 = require("../../config");
const util_1 = require("util");
const validateRequest = (data) => {
    return core_1.parseOptions("body", data, [
        { name: "commerce_code", type: "string", required: true },
        { name: "buy_order", type: "string", required: true },
        { name: "token", type: "string", required: true },
        { name: "amount", type: "number", required: true }
    ], "no_extra");
};
const validateResponse = (response) => {
    return core_1.parseOptions("response", response, [
        { name: "type", type: "enum", required: true, enumValues: ["NULLIFIED", "REVERSED"] },
        { name: "authorization_code", type: "string", required: false },
        { name: "authorization_date", type: "string", required: false },
        { name: "nullified_amount", type: "number", required: false },
        { name: "balance", type: "number", required: false },
        { name: "response_code", type: "number", required: false }
    ], "no_extra");
};
const refundTransaction = (config) => async (body, logger) => {
    const data = validateRequest(body);
    const args = {
        url: `${config.environment.host}/rswebpaytransaction/api/webpay/v1.0/transactions/${data.token}/refunds`,
        method: "POST",
        headers: config_1.AUTH_HEADERS(config),
        data: {
            commerce_code: data.commerce_code,
            buy_order: data.buy_order,
            token: data.token,
            amount: data.amount,
        }
    };
    logger.info(`refund ${util_1.inspect(args)}`);
    const response = await core_1.request(args);
    logger.info(`refund response ${util_1.inspect(response.data)}`);
    return validateResponse(response);
};
exports.refundTransaction = refundTransaction;
