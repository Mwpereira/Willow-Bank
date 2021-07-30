import {TransactionActions} from '../enums/transaction-actions';
import {TransactionTypes} from '../enums/transaction-types';

export interface EtransferTransaction {
  id: number;
  name: string,
  email: string,
  action: TransactionActions;
  type: TransactionTypes;
  amount: string;
  date: string;
}
