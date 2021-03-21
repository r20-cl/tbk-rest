"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WBPPMallClient = void 0;
const integration_1 = require("../../config/integration");
const commit_transaction_1 = require("./commit-transaction");
const transaction_status_1 = require("./transaction-status");
const refund_1 = require("./refund");
const init_transaction_1 = require("./init-transaction");
class WBPPMallClient {
    constructor(config = integration_1.INTEGRATION_CONFIGS.WBPP_MALL) {
        this.endpoints = {
            initTransaction: init_transaction_1.initTransaction(config),
            commitTransaction: commit_transaction_1.commitTransaction(config),
            transactionStatus: transaction_status_1.transactionStatus(config),
            transactionRefund: refund_1.refundTransaction(config)
        };
    }
}
exports.WBPPMallClient = WBPPMallClient;
