import moment from 'moment';
import {TransactionActions} from '../enums/transaction-actions';
import {TransactionTypes} from '../enums/transaction-types';
import {Account} from '../interfaces/account';
import {Transaction} from '../interfaces/transaction';

export default class TransactionUtils {
  public static getTransaction(account: Account, amount: number, transactionAction: TransactionActions, receiver?: string): Transaction {
    return {
      id: account.transactions.length + 1,
      receiver: receiver ? receiver : 'Willow Bank',
      type: transactionAction ? transactionAction : TransactionTypes.ADMIN,
      amount: `$${amount.toLocaleString()}`,
      date: moment().format('MMMM Do YYYY, h:mm:ss a')
    } as Transaction;
  }

  public static generateTransaction(account: Account, amount: number, transactionAction: TransactionActions, receiver?: string): Account {
    amount = parseFloat(amount.toFixed(2));

    if (transactionAction === TransactionActions.DEPOSIT) {
      account.balance += amount;
    }
    if (transactionAction === TransactionActions.WITHDRAW) {
      if (account.balance >= amount) {
        account.balance -= amount;
      } else {
        throw new Error();
      }
    }

    account.balance = parseFloat(account.balance.toFixed(2));
    account.transactions.push(this.getTransaction(account, amount, transactionAction, receiver));

    return account;
  }
}
