"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneClickMallClient = void 0;
const integration_1 = require("../../config/integration");
const subscribe_1 = require("./subscribe");
const unsubscribe_1 = require("./unsubscribe");
const confirm_subscription_1 = require("./confirm_subscription");
const init_transaction_1 = require("./init_transaction");
const refund_1 = require("./refund");
class OneClickMallClient {
    constructor(config = integration_1.INTEGRATION_CONFIGS.ONE_CLICK_MALL) {
        this.endpoints = {
            refund: refund_1.refundTransaction(config),
            subscribe: subscribe_1.subscribe(config),
            unsubscribe: unsubscribe_1.unSubscribe(config),
            confirmSubscription: confirm_subscription_1.confirmSubscription(config),
            initTransaction: init_transaction_1.initTransaction(config)
        };
    }
}
exports.OneClickMallClient = OneClickMallClient;
