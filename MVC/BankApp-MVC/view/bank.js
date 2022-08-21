const uuid = require('uuid')
class Bank {
    static allBanks = []

    constructor(bankname, bankAbbrevation) {
        this.bankId = uuid.v4();
        this.bankname = bankname;
        this.bankAbbrevation = bankAbbrevation;
    }

    static createNewBank(bankname, bankAbbrevation) {
        let [indexOfBank, isBankexist] = Bank.findBank(bankAbbrevation)
        if (isBankexist) {
            return [null,"Bank Already Exists"];
        }
        let newBank = new Bank(bankname, bankAbbrevation)
        Bank.allBanks.push(newBank)
        return [newBank,"Bank Created"];
    }

    static findBank(bankAbbrevation) {
        if (Bank.allBanks.length == 0) {
            return [null, false]
        }
        for (let index = 0; index < Bank.allBanks.length; index++)
        {
            if (Bank.allBanks[index].bankAbbrevation == bankAbbrevation) 
            {
                return [index, true]
            }
        }
        return [null, false]
    }
}

module.exports = Bank;