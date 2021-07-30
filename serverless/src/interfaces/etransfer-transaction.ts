import {TransactionActions} from '../enums/transaction-actions';
import {TransactionTypes} from '../enums/transaction-types';
import {Contact} from './contact';

export interface EtransferTransaction {
  id: number;
  receiver: Contact,
  action: TransactionActions;
  type: TransactionTypes;
  amount: string;
  date: string;
}
