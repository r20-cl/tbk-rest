import {Endpoint, TBKConfig} from "../../config";
import {INTEGRATION_CONFIGS} from "../../config/integration";
import {subscribe, SubscribeRequest, SubscribeResponse} from "./subscribe";
import {unSubscribe, UnSubscribeRequest} from "./unsubscribe";
import {confirmSubscription, ConfirmSubscriptionRequest, ConfirmSubscriptionResponse} from "./confirm_subscription";
import {initTransaction, InitTransactionRequest, InitTransactionResponse} from "./init_transaction";
import { refundTransaction, RefundTransactionReponse, RefundTransactionRequest } from "./refund";

export {
  RefundTransactionRequest,
  RefundTransactionReponse,
  InitTransactionRequest,
  InitTransactionResponse,
  ConfirmSubscriptionRequest,
  ConfirmSubscriptionResponse,
  UnSubscribeRequest,
  SubscribeRequest,
  SubscribeResponse
}

export class OneClickMallClient {

  public readonly endpoints: {
    refund: Endpoint<RefundTransactionRequest, RefundTransactionReponse>;
    subscribe: Endpoint<SubscribeRequest, SubscribeResponse>;
    unsubscribe: Endpoint<UnSubscribeRequest, void>;
    confirmSubscription: Endpoint<ConfirmSubscriptionRequest, ConfirmSubscriptionResponse>;
    initTransaction: Endpoint<InitTransactionRequest, InitTransactionResponse>;
  };

  public constructor(config: TBKConfig = INTEGRATION_CONFIGS.ONE_CLICK_MALL) {
    this.endpoints = {
      refund: refundTransaction(config),
      subscribe: subscribe(config),
      unsubscribe: unSubscribe(config),
      confirmSubscription: confirmSubscription(config),
      initTransaction: initTransaction(config)
    };
  }

}
