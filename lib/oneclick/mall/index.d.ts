import { Endpoint, TBKConfig } from "../../config";
import { SubscribeRequest, SubscribeResponse } from "./subscribe";
import { UnSubscribeRequest } from "./unsubscribe";
import { ConfirmSubscriptionRequest, ConfirmSubscriptionResponse } from "./confirm_subscription";
import { InitTransactionRequest, InitTransactionResponse } from "./init_transaction";
export { InitTransactionRequest, InitTransactionResponse, ConfirmSubscriptionRequest, ConfirmSubscriptionResponse, UnSubscribeRequest, SubscribeRequest, SubscribeResponse };
export declare class OneClickMallClient {
    readonly endpoints: {
        subscribe: Endpoint<SubscribeRequest, SubscribeResponse>;
        unsubscribe: Endpoint<UnSubscribeRequest, void>;
        confirmSubscription: Endpoint<ConfirmSubscriptionRequest, ConfirmSubscriptionResponse>;
        initTransaction: Endpoint<InitTransactionRequest, InitTransactionResponse>;
    };
    constructor(config?: TBKConfig);
}
