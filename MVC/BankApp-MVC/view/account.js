const uuid = require('uuid')
class Account {
    constructor(bankname) {
        this.accountId = uuid.v4();
        this.bankAbbrevation = bankname
        this.balance = 1000
    }

    isAccountexist(bankAbbrevation){
        return this.bankAbbrevation==bankAbbrevation;
    }

    isSufficientBalance(amount){
        return this.balance>=1000;
    }
}
module.exports = Account;