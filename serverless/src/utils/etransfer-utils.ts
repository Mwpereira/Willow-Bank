import moment from "moment";
import {TransactionActions} from "../enums/transaction-actions";
import {TransactionTypes} from "../enums/transaction-types";
import {Contact} from "../interfaces/contact";
import {Etransfer} from "../interfaces/etransfer";
import {EtransferTransaction} from "../interfaces/etransfer-transaction";

export default class EtransferUtils {
  public static getEtransferTransaction(etransfer: Etransfer, amount: number, receiver: Contact): EtransferTransaction {
    return {
      id: etransfer.transactions.length + 1,
      name: receiver.name,
      email: receiver.email,
      action: TransactionActions.WITHDRAW,
      type: TransactionTypes.ETRANSFER,
      amount: `$${amount.toLocaleString()}`,
      date: moment().format("MMMM Do YYYY, h:mm:ss a")
    } as EtransferTransaction;
  }

  public static generateEtransfer(etransfer: Etransfer, amount: number, receiver: Contact): Etransfer {
    etransfer.transactions.push(this.getEtransferTransaction(etransfer, amount, receiver));

    return etransfer;
  }
}
