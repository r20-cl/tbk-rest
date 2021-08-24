"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTransaction = void 0;
const core_1 = require("@miqro/core");
const config_1 = require("../../config");
const util_1 = require("util");
const validateRequest = (data) => {
    return core_1.parse("body", data, [
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
    ], "no_extra");
};
const validateResponse = (response) => {
    return core_1.parse("response", response, [
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
    ], "no_extra");
};
const initTransaction = (config) => async (body, logger) => {
    const data = validateRequest(body);
    logger.info(util_1.inspect(data));
    const response = await core_1.request({
        url: `${config.environment.host}/rswebpaytransaction/api/oneclick/v1.0/transactions`,
        method: "POST",
        headers: config_1.AUTH_HEADERS(config),
        data
    });
    logger.info(util_1.inspect(response.data));
    return validateResponse(response.data);
};
exports.initTransaction = initTransaction;
