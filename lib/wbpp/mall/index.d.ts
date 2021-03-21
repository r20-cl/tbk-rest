import { Endpoint, TBKConfig } from "../../config";
import { CommitTransactionRequest, CommitTransactionResponse } from "./commit-transaction";
import { TransactionStatusRequest, TransactionStatusResponse } from "./transaction-status";
import { RefundTransactionRequest, RefundTransactionReponse } from "./refund";
import { InitTransactionRequest, InitTransactionResponse } from "./init-transaction";
export { CommitTransactionRequest, CommitTransactionResponse, TransactionStatusRequest, TransactionStatusResponse, RefundTransactionRequest, RefundTransactionReponse, InitTransactionRequest, InitTransactionResponse };
export declare class WBPPMallClient {
    readonly endpoints: {
        initTransaction: Endpoint<InitTransactionRequest, InitTransactionResponse>;
        commitTransaction: Endpoint<CommitTransactionRequest, CommitTransactionResponse>;
        transactionStatus: Endpoint<TransactionStatusRequest, TransactionStatusResponse>;
        transactionRefund: Endpoint<RefundTransactionRequest, RefundTransactionReponse>;
    };
    constructor(config?: TBKConfig);
}
