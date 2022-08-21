const Customer = require("../view/customer")
const JWTPayload = require('../view/authentication.js');

let [banker,message] = [null,"Already exist"];
async function createBankManager()
{
    [banker,message] = await Customer.createBankManager("Avisha","Jain","avj","123");
    return;
}

async function createCustomer(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "banker"){
        resp.status(401).send("please specify this role to banker")
        return;
    }
    let {firstname, lastname,userName,password} = req.body;

    if (typeof firstname != "string") {
        resp.status(406).send("First Name is invalid");
        return;
    }

    if (typeof lastname != "string") {
        resp.status(406).send("LastName is invalid");
        return;
    }    
    
    if (typeof userName != "string") {
        resp.status(406).send("userName is invalid");
        return;
    }

    if (typeof password != "string") {
        resp.status(406).send("password is invalid");
        return;
    }

    let [newCustomer,message] = await banker.createNewCustomer(firstname, lastname,userName,password);
    if(newCustomer== null)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(newCustomer);
    return;
}

function getAllCustomer(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "banker"){
        resp.status(401).send("please specify this role to banker")
        return;
    }
    resp.status(201).send(Customer.allCustomers);
    return;
}

function getAllAccount(req,resp)
{
    let userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "banker")
    {
        if(newPayload.userName != userName)
        {
            resp.status(401).send("Login with your correct ID")
            return;
        }
        let [flag,allAccount,message] = Customer.getUserAllAccount(userName);
        if(flag== false)
        {
            resp.status(403).send(message);
            return;
        }
        resp.status(201).send(allAccount);
        return;
    }
    let [flag,allAccount,message] = Customer.getUserAllAccount(userName);
    if(flag== false)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(allAccount);
    return;
}

function withDraw(req,resp)
{
    let userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.userName != userName){
        resp.status(401).send("Login with Correct ID")
        return;
    }
    let {amount,debitBankAbbrevation} = req.body;

    if (typeof amount != "number") {
        resp.status(406).send("Amount is invalid");
        return;
    }

    if (typeof debitBankAbbrevation != "string") {
        resp.status(406).send("debitCardAbbrevation is invalid");
        return;
    }    

    let [indexOfCustomer,isCustomerExists] = Customer.findCustomer(userName);
    if(!isCustomerExists)
    {
        resp.status(403).send("Not find any Customer with this username");
        return;
    }
    let [isAccountExists,message]=Customer.allCustomers[indexOfCustomer].withdraw(amount,debitBankAbbrevation);
    if(!isAccountExists)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(message);
    return;
}

function deposit(req,resp)
{
    
    let userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.userName != userName){
        resp.status(401).send("Login with Correct ID")
        return;
    }
    let {amount,creditBankAbbrevation} = req.body;

    if (typeof amount != "number") {
        resp.status(406).send("Amount is invalid");
        return;
    }

    if (typeof creditBankAbbrevation != "string") {
        resp.status(406).send("crditCardAbbrevation is invalid");
        return;
    } 

    let [indexOfCustomer,isCustomerExists] = Customer.findCustomer(userName);
    if(!isCustomerExists)
    {
        resp.status(403).send("Not find any Customer with this username");
        return;
    }
    let [isAccountExists,message]=Customer.allCustomers[indexOfCustomer].deposit(amount,creditBankAbbrevation);
    if(!isAccountExists)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(message);
    return;
}

function transfer(req,resp)
{
    let debitCustomer = req.params.debitCustomer;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.userName != debitCustomer){
        resp.status(401).send("Login with Correct ID")
        return;
    }
    let {amount,creditCustomer,creditBankAbbrevation, debitBankAbbrevation} = req.body;

    if (typeof amount != "number") {
        resp.status(406).send("Amount is invalid");
        return;
    }

    if (typeof creditBankAbbrevation != "string") {
        resp.status(406).send("crditCardAbbrevation is invalid");
        return;
    } 
    
    if (typeof debitBankAbbrevation != "string") {
        resp.status(406).send("DebitCardAbbrevation is invalid");
        return;
    }

    if (typeof creditCustomer != "string") {
        resp.status(406).send("crditCustomer is invalid");
        return;
    } 
    let [indexOfCustomer,isCustomerExists] = Customer.findCustomer(debitCustomer);
    if(!isCustomerExists)
    {
        resp.status(403).send("Not find any Customer with this username");
        return;
    }
    let [isAccountExists,message]=Customer.allCustomers[indexOfCustomer].transfer(amount, creditCustomer, creditBankAbbrevation, debitBankAbbrevation);
    if(!isAccountExists)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(message);
    return;
}

function selftransfer(req,resp)
{
    let creditCustomer  = req.params.creditCustomer;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.userName != creditCustomer){
        resp.status(401).send("Login with Correct ID")
        return;
    }
    let {amount,creditBankAbbrevation, debitBankAbbrevation} = req.body;

    if (typeof amount != "number") {
        resp.status(406).send("Amount is invalid");
        return;
    }

    if (typeof creditBankAbbrevation != "string") {
        resp.status(406).send("crditCardAbbrevation is invalid");
        return;
    } 

    if (typeof debitBankAbbrevation != "string") {
        resp.status(406).send("debitCardAbbrevation is invalid");
        return;
    }

    let [indexOfCustomer,isCustomerExists] = Customer.findCustomer(creditCustomer);
    if(!isCustomerExists)
    {
        resp.status(403).send("Not find any Customer with this username");
        return;
    }
    let [isAccountExists,message]=Customer.allCustomers[indexOfCustomer].transfer(amount, creditCustomer, creditBankAbbrevation, debitBankAbbrevation);
    if(!isAccountExists)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(message);
    return;
}

module.exports = {createBankManager,createCustomer,getAllCustomer,getAllAccount,withDraw,deposit,transfer,selftransfer};