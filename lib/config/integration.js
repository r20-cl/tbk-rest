"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTEGRATION_CONFIGS = exports.INTEGRATION_STORE_CODES = exports.INTEGRATION_API_KEY_SECRET = exports.INTEGRATION_HOST = void 0;
exports.INTEGRATION_HOST = "https://webpay3gint.transbank.cl";
exports.INTEGRATION_API_KEY_SECRET = "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C";
exports.INTEGRATION_STORE_CODES = {
    WBPP_MALL: {
        MALL: "597055555535",
        STORE1: "597055555536",
        STORE2: "597055555537",
        STORE3: "597055555536"
    },
    ONE_CLICK_MALL: {
        MALL: "597055555541"
    }
};
exports.INTEGRATION_CONFIGS = {
    WBPP_MALL: {
        environment: {
            host: exports.INTEGRATION_HOST
        },
        auth: {
            apiKeyId: exports.INTEGRATION_STORE_CODES.WBPP_MALL.MALL,
            apiKeySecret: exports.INTEGRATION_API_KEY_SECRET
        }
    },
    ONE_CLICK_MALL: {
        environment: {
            host: exports.INTEGRATION_HOST
        },
        auth: {
            apiKeyId: exports.INTEGRATION_STORE_CODES.ONE_CLICK_MALL.MALL,
            apiKeySecret: exports.INTEGRATION_API_KEY_SECRET
        }
    }
};
