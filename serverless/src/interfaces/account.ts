import {Transaction} from './transaction';

export interface Account {
    balance: number,
    transactions: Transaction[],
    payees: object
}
