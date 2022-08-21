const Bank = require("../view/bank");
const JWTPayload = require("../view/authentication")

function createBank(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "banker"){
        resp.status(401).send("please specify this role to banker")
        return;
    }
    let {bankname, bankAbbrevation} = req.body;

    if (typeof bankname != "string") {
        resp.status(406).send("Bank Name is invalid");
        return;
    }

    if (typeof bankAbbrevation != "string") {
        resp.status(406).send("Bank Abbrevation is invalid");
        return;
    }

    let [bank,message] = Bank.createNewBank(bankname, bankAbbrevation);
    if(bank == null)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(bank);
    return;
}

function getAllBank(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "banker"){
        resp.status(401).send("please specify this role to banker")
        return;
    }
    resp.status(201).send(Bank.allBanks);
    return;
}

module.exports = {createBank,getAllBank};