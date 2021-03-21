"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionStatus = void 0;
const core_1 = require("@miqro/core");
const util_1 = require("util");
const config_1 = require("../../config");
const transactionStatus = (config) => {
    return async (token, logger) => {
        logger.info(`get ${util_1.inspect(token)}`);
        core_1.parseOptions("token", token, [
            { name: "token", type: "string", required: true }
        ], "no_extra");
        const args = {
            url: `${config.environment.host}/rswebpaytransaction/api/webpay/v1.0/transactions/${token.token}`,
            headers: config_1.AUTH_HEADERS(config),
            method: "GET"
        };
        const response = await core_1.request(args);
        logger.info(`get ${util_1.inspect(response.data)}`);
        const result = core_1.parseOptions("response", response.data, [
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
        return result;
    };
};
exports.transactionStatus = transactionStatus;
