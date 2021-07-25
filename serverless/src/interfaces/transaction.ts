import {TransactionActions} from '../../../client/src/enums/transaction-actions';
import {TransactionTypes} from '../enums/transaction-types';

export interface Transaction {
  id: number,
  receiver: string,
  type: TransactionTypes,
  action: TransactionActions,
  amount: number | string,
  date: string
}
