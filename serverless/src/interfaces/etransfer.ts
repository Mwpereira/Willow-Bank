import {EtransferTransaction} from './etransfer-transaction';

export interface Etransfer {
  transactions: EtransferTransaction[];
  contacts: object;
}
