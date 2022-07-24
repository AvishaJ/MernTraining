const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const uuid = require('uuid');
const JWTPayload = require('./models/auth');
const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

const Bank = require("./models/bank");
const Customer = require('./models/customer')
const Account = require("./models/account")
const Credentials = require("./models/credentail")

app.post("/api/v1/login/:userName", async (req,resp)=>{
    const userName = req.params.userName
    const password = req.body.password
    let [indexOfCustomer,isCustomerExists] = Customer.findCust(userName)
    let isMatch = await Customer.allCustomers[indexOfCustomer].comparePassword(password)
    if(!isCustomerExists || isMatch == false)
    {
        resp.status(504).send("Invalid Credentials")
        return;
    }
    const newPayload = new JWTPayload(Customer.allCustomers[indexOfCustomer])
    const newToken = newPayload.createToken()
    resp.cookie("myToken",newToken)
    resp.status(200).send("logged in ")

})
app.post("/api/v1/createBank", (req, resp) => {
    let { bankName, bankAbbreviation } = req.body
    let [newBank, message] = Bank.createNewBank(bankName, bankAbbreviation)
    if (newBank == null) {
        resp.status(504).send(message)
        return
    }
    resp.status(201).send(newBank)
})

app.get("/api/v1/getAllBanks",(req,resp)=>{

    resp.status(201).send(Bank.allBanks)
})

app.post("/api/v1/createCustomer",(req,resp)=>{
    let { firstName, lastName, userName,password} = req.body
    let [ newCustomer , message]= Customer.creatNewCustomer(firstName, lastName, userName,password)
   
    if (newCustomer == null) {
        resp.status(504).send(message)
        return
    }
    resp.status(201).send(newCustomer)
})
app.get("/api/v1/getAllCustomer",(req,resp)=>{

    resp.status(201).send(Customer.allCustomers)
})

 app.post("/api/v1/createAcc",(req,resp)=>{
    let {newCustomer,bankAbbreviation}=req.body
    let [newAcc,message]= Customer.createNewAcc(bankAbbreviation,newCustomer)
    console.log(newAcc)
    if(newAcc == null){
        resp.status(500).send(message)
        return
    }
    resp.status(201).send(newAcc)

 })

 app.post("/api/v1/withdraw",(req,resp)=>{
    let {userName,amt,debitBankAbbrevation} = req.body
    let [indexOfCustomer,isCustomerExists] = Customer.findCust(userName)
    if(!isCustomerExists)
    {
        resp.status(504).send("Cannot find Customer with this username");
        return;
    }
    let [isAccountExists,message]=Customer.allCustomers[indexOfCustomer].withdraw(amt,debitBankAbbrevation)
    if(!isAccountExists)
    {
        resp.status(504).send(message)
        return
    }
    resp.status(200).send(message)
    return

 })

 app.post("/api/v1/deposit",(req,resp)=>{
    let {userName,amt,creditBankAbbreviation} = req.body
    let [indexOfCustomer,isCustomerExists] = Customer.findCust(userName)
    if(!isCustomerExists)
    {
        resp.status(504).send("Cannot find Customer with this username")
        return;
    }
    let [isAccountExists,message]=Customer.allCustomers[indexOfCustomer].deposit(amt,creditBankAbbreviation)
    if(!isAccountExists)
    {
        resp.status(504).send(message)
        return
    }
    resp.status(200).send(message)
    return

 })

 app.post("/api/v1/transfer",(req,resp)=>{
    let {amt,creditCust,debitCustomer,creditBankAbbr, debitBankabbr} = req.body;
    let [indexOfCustomer,isCustomerExists] = Customer.findCustomer(debitCustomer);
    if(!isCustomerExists)
    {
        resp.status(504).send("Not find any Customer with this username")
        return;
    }
    let [isAccountExists,message]=Customer.allCustomers[indexOfCustomer].transfer(amt,debitBankabbr, creditBankAbbr, creditCust)
    if(!isAccountExists)
    {
        resp.status(504).send(message);
        return;
    }
    resp.status(200).send(message);
    return;
 })

 app.post("/api/v1/selftransfer",(req,resp)=>{
    let {amt,creditCustomer ,creditBankAbbrevation, debitBankAbbrevation} = req.body;
    let [indexOfCustomer,isCustomerExists] = Customer.findCustomer(creditCustomer);
    if(!isCustomerExists)
    {
        resp.status(504).send("Not find any Customer with this username");
        return;
    }
    let [isAccountExists,message] = Customer.allCustomers[indexOfCustomer].transfer(amt,debitBankabbr, creditBankAbbr, creditCust)
    if(!isAccountExists)
    {
        resp.status(504).send(message);
        return
    }
    resp.status(200).send(message);
    return


})

 app.post("/api/v1/logout",(req,resp)=>{
    resp.cookie("myToken",'none',{
        expires: new Date(Date.now()+ 0*1000),
    })
    resp.status(200).send("User Logged out Successfully");
})

app.listen(9000, () => {
    console.log("App Started at port 9000")
})