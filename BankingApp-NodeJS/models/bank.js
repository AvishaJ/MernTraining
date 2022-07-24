const uuid = require('uuid');
const Customer = require("./customer")
class Bank {
     static allBanks=[]
    constructor(bankName, bankAbbreviation) {
        this.bankId = uuid.v4()
        this.bankName = bankName
        this.bankAbbreviation = bankAbbreviation
    }

      static createNewBank(bankName, bankAbbreviation) {
        // for (let indexOfBank = 0; indexOfBank < Bank.allBanks.length; indexOfBank++) {
        //     if (Bank.allBanks[indexOfBank].bankName == bankName || Bank.allBanks[indexOfBank].bankAbbreviation == bankAbbreviation) {
        //         return [null, "Bank Exists"]

        //     }
        // }
        let [indexOfBank, isBankexist] = Bank.findBank(bankAbbreviation)
        if (isBankexist) 
        {
            return [null,"Bank Already Exists"]
        }
    
        let newBank = new Bank( bankName, bankAbbreviation)
        Bank.allBanks.push(newBank)
        return [newBank,"Bank Created"]

    }
    static findBank(bankAbbreviation) {
        for (let index = 0; index < Bank.allBanks.length; index++) {
            if (Bank.allBanks[index].bankName == bankName || Bank.allBanks[index].bankAbbreviation == bankAbbreviation) {
                return [index, true]

            }
            return [-1, false]
        }
    }

}

module.exports= Bank