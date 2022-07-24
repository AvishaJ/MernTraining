const uuid = require('uuid');
const Bank = require("./bank");
class Account {
    constructor(bank) {
        this.AccountId = uuid.v4()
        this.bankAbbreviation = bank
        this.balance = 1000
    }

    displayBal() {
        console.log(`balance is : ${this.balance}`)
    }

    isSufficientBal(amt) {
        return amt <= this.balance
    }

    isAccountExists(bankAbbreviation) {
        return this.bankAbbreviation == bankAbbreviation
    }

}
module.exports= Account