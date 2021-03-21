import { TBKConfig } from "./index";
export declare const INTEGRATION_HOST = "https://webpay3gint.transbank.cl";
export declare const INTEGRATION_API_KEY_SECRET = "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C";
export declare const INTEGRATION_STORE_CODES: {
    WBPP_MALL: {
        MALL: string;
        STORE1: string;
        STORE2: string;
        STORE3: string;
    };
    ONE_CLICK_MALL: {
        MALL: string;
    };
};
export declare const INTEGRATION_CONFIGS: {
    WBPP_MALL: TBKConfig;
    ONE_CLICK_MALL: {
        environment: {
            host: string;
        };
        auth: {
            apiKeyId: string;
            apiKeySecret: string;
        };
    };
};
