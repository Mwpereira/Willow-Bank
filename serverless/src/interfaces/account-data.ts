import {Account} from './account';

export interface AccountData extends Account {
    account: {
        account: Account
    }
}
