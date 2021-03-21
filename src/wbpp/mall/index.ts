import { Endpoint, TBKConfig } from "../../config";
import { INTEGRATION_CONFIGS } from "../../config/integration";
import { CommitTransactionRequest, CommitTransactionResponse, commitTransaction } from "./commit-transaction";
import { TransactionStatusRequest, TransactionStatusResponse, transactionStatus } from "./transaction-status";
import { refundTransaction, RefundTransactionRequest, RefundTransactionReponse } from "./refund";
import { InitTransactionRequest, InitTransactionResponse, initTransaction } from "./init-transaction";

export {
  CommitTransactionRequest,
  CommitTransactionResponse,
  TransactionStatusRequest,
  TransactionStatusResponse,
  RefundTransactionRequest,
  RefundTransactionReponse,
  InitTransactionRequest,
  InitTransactionResponse
};

export class WBPPMallClient {

  public readonly endpoints: {
    initTransaction: Endpoint<InitTransactionRequest, InitTransactionResponse>;
    commitTransaction: Endpoint<CommitTransactionRequest, CommitTransactionResponse>;
    transactionStatus: Endpoint<TransactionStatusRequest, TransactionStatusResponse>;
    transactionRefund: Endpoint<RefundTransactionRequest, RefundTransactionReponse>;
  };

  public constructor(config: TBKConfig = INTEGRATION_CONFIGS.WBPP_MALL) {
    this.endpoints = {
      initTransaction: initTransaction(config),
      commitTransaction: commitTransaction(config),
      transactionStatus: transactionStatus(config),
      transactionRefund: refundTransaction(config)
    };
  }
}
