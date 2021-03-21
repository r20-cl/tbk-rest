import {TBKConfig} from "./index";

export const INTEGRATION_HOST = "https://webpay3gint.transbank.cl";

export const INTEGRATION_API_KEY_SECRET = "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C";

export const INTEGRATION_STORE_CODES = {
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

export const INTEGRATION_CONFIGS = {
  WBPP_MALL: {
    environment: {
      host: INTEGRATION_HOST
    },
    auth: {
      apiKeyId: INTEGRATION_STORE_CODES.WBPP_MALL.MALL,
      apiKeySecret: INTEGRATION_API_KEY_SECRET
    }
  } as TBKConfig,
  ONE_CLICK_MALL: {
    environment: {
      host: INTEGRATION_HOST
    },
    auth: {
      apiKeyId: INTEGRATION_STORE_CODES.ONE_CLICK_MALL.MALL,
      apiKeySecret: INTEGRATION_API_KEY_SECRET
    }
  }
};
