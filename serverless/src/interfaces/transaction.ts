import {TransactionTypes} from '../enums/transaction-types';

export interface Transaction {
  id: number,
  payee: string,
  type: TransactionTypes,
  amount: number | string,
  date: string
}
