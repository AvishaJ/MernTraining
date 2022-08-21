
const Customer = require("../view/customer")
const JWTPayload = require('../view/authentication.js');
function createNewAccount(req,resp)
{
    let newCustomer = req.params.newCustomer;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.userName != newCustomer){
        resp.status(401).send("Login with Correct ID")
        return;
    }
    let bankAbbrevation = req.body.bankAbbrevation;

    if (typeof bankAbbrevation != "string") {
        resp.status(406).send("BankAbbrevation is invalid");
        return;
    } 
    let [isNewAccount,message] = Customer.createnewAccount(bankAbbrevation,newCustomer);
    if(isNewAccount == null)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(isNewAccount);
    return;
}

module.exports = {createNewAccount};