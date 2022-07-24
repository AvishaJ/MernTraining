const uuid = require('uuid');
const Bank = require("./bank")
const Account = require("./account");
const Credentials = require('./credentail');
class Customer {
    static allCustomers=[]
    constructor(firstName, lastName,credentials) {
        this.customerId = uuid.v4()
        this.firstName = firstName
        this.lastName = lastName
        this.credentials=credentials
        this.totalBalance = 0
        this.accounts = []// object of accounts
    }

    static creatNewCustomer(firstName, lastName, userName,password) {
        let [indexOfCustomer,isUserNameExits] = Customer.findCust(userName)
        console.log(isUserNameExits)
        if(isUserNameExits){
            return ["UserName Exists"]
        }
        const newCredential = new Credentials(userName,password)
        const newCustomer = new Customer(firstName, lastName, newCredential)
        Customer.allCustomers.push(newCustomer)
        return [newCustomer,"Customer Created"]
    }

    static createNewAcc(bankAbbreviation,userName) {
        let [indexOfCustomer,isCustomerExists] = Customer.findCust(userName)
        if(!isCustomerExists)
        {
            console.log(isCustomerExists,"********")
            return [null,"No customer Exist with this UserName"]
           
        }
        
        let [indexOfBank, isBankExist] = Bank.findBank(bankAbbreviation)
        if(!isBankExist){
            console.log(isBankExist,"#######")
            return [null,"No bank exists with this name"]
            
        }
        
        let bank = Bank.allBanks[indexOfBank].bankAbbreviation
        let [indexOfAccount ,isAccountExist]= Customer.allCustomers[indexOfCustomer].isAccountExists(bankAbbreviation)
        if(isAccountExist){
            return [null,"you already have a Account in this bank"]
        }

        const newAcc = new Account(bank)
        Customer.allCustomers[indexOfCustomer].accounts.push(newAcc)
        Customer.allCustomers[indexOfCustomer].updateBalance()
        return [newAcc,"Account is created"]
    }

    isAccountExists(bankAbbreviation) {
        for (let index = 0; index < this.accounts.length; index++) 
        {
            
            if (this.accounts[index].bankAbbreviation == bankAbbreviation) 
            {
                return [index,true]
            }
           

        }
        return [-1,false]
    }

    async comparePassword(userName)
    {
        let isMatch = await bcrypt.compare(this.credentials.password,password)
        return isMatch
    }

    static findCust(userName) {
        for (let index = 0; index < Customer.allCustomers.length; index++) {
            // let custArray = Customer.allCustomers[index]
            if (Customer.allCustomers[index].userName == userName) {
                return [index,true]
            }

        }
        return [-1,false]
    }
    // total balance 
    updateBalance() {
        let total = 0
        for (let index = 0; index < this.accounts.length; index++) {
            const accArray = this.accounts[index];
            total = total + accArray.balance
        }
        this.totalBalance = total
    }

    withdraw(amt, bankAbbreviation) {
        let [indexOfBank,isAccountExist]= this.isAccountExists(bankAbbreviation)
        if (!isAccountExists) {
            return [false,"No account"]
        }

        let isSufficientBal = this.isSufficientBal(amt)
        if (!isSufficientBal) {
            return [false, "No balance"]
        }

        else {
            this.accounts[indexOfBank].balance = this.accounts[indexOfBank].balance - amt
            this.updateBalance()
            return [true,"Amount withdrawn successfully"]
        }
    }

    deposit(amt, bankAbbreviation) {
        let [indexOfBank,isAccountExist]= this.isAccountExists(bankAbbreviation)
        if (!isAccountExists) {
            return [false,"No account"]
        }
        this.accounts[indexOfBank].balance = this.accounts[indexOfBank].balance + amt
        this.updateBalance()
        return [true,"Amount deposited successfully"]
    }

    transfer(amt, debitBankabbr, creditBankAbbr, creditCust) {

        let [indexOfCustomer,isCustExists] = Customer.findCust(creditCust)

        if (!isCustExists) {
            return [false, "No customer"]
        }

        let [isWithdraw,message] = this.withdraw(amt, debitBankabbr)
        if (!isWithdraw) {
            return [false,"Withdraw failed"]
        }

        let [isDeposit, msg] = Customer.allCustomers[indexOfCustomer].deposit(amt,creditBankAbbr)
        if (!isDeposit) {
            return [True, " Transaction completed"]
        }

        let isDepositFail = this.deposit(amt, debitBankabbr)
        if (!isDepositFail) {
            return [false,"Transaction failed, Try Again Later"]
        }
    }

    // selfTransfer(amt, debitBankabbr, creditBankAbbr) {

    //     this.transfer(amt,debitBankabbr,creditBankAbbr,creditCustId)

    // }

}

module.exports= Customer