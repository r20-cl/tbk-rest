"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTransaction = void 0;
const core_1 = require("@miqro/core");
const config_1 = require("../../config");
const util_1 = require("util");
const initTransaction = (config) => {
    return async (transactions, logger) => {
        const data = core_1.parse("transactions", transactions, [
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
            headers: config_1.AUTH_HEADERS(config),
            data
        };
        logger.info(util_1.inspect(requestConfig, {
            depth: 100
        }));
        const response = await core_1.request(requestConfig);
        const result = core_1.parse("response", response.data, [
            { name: "token", type: "string", required: true },
            { name: "url", type: "string", required: true },
        ], "no_extra");
        return result;
    };
};
exports.initTransaction = initTransaction;
