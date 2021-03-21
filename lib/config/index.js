"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_HEADERS = void 0;
const AUTH_HEADERS = (config) => {
    return {
        "Tbk-Api-Key-Id": config.auth.apiKeyId,
        "Tbk-Api-Key-Secret": config.auth.apiKeySecret,
        "Content-Type": "application/json"
    };
};
exports.AUTH_HEADERS = AUTH_HEADERS;
