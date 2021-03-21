"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unSubscribe = void 0;
const core_1 = require("@miqro/core");
const config_1 = require("../../config");
const util_1 = require("util");
const validateRequest = (data) => {
    return core_1.parseOptions("body", data, [
        { name: "tbk_user", type: "string", required: true },
        { name: "username", type: "string", required: true }
    ], "no_extra");
};
const validateResponse = (response) => {
    core_1.parseOptions("response", response, [], "no_extra");
};
const unSubscribe = (config) => async (body, logger) => {
    const data = validateRequest(body);
    logger.info(util_1.inspect(data));
    const response = await core_1.request({
        url: `${config.environment.host}/rswebpaytransaction/api/oneclick/v1.0/inscriptions`,
        method: "DELETE",
        headers: config_1.AUTH_HEADERS(config),
        data
    });
    logger.info(util_1.inspect(response.data));
    return validateResponse(response.data);
};
exports.unSubscribe = unSubscribe;
