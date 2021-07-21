import { TransactionTypes } from "@/enums/transaction-types";

export interface Transaction {
  id?: number;
  type: TransactionTypes;
  amount: number;
  receiver: string;
}
