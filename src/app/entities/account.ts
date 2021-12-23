import { AccountDetail } from './account-detail';
import { Customer } from './customer';

export class Account {
    
    customerId: number;
    accountDate: Date;
    accountDetails: Array<AccountDetail>;
}
