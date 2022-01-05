import { Payee } from "@/interfaces/payee";
import { TransactionActions } from "@/enums/transaction-actions";
import { TransactionTypes } from "@/enums/transaction-types";

export interface Transaction {
  id: number;
  receiver: Payee;
  type: TransactionTypes;
  action: TransactionActions;
  amount: number | string;
  date: string;
}
