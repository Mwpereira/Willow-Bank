import { TransactionActions } from "../../../serverless/src/enums/transaction-actions";

export interface AdminTransaction {
  amount: number;
  action: TransactionActions;
}
