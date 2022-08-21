const Customer = require("../view/customer")
const JWTPayload = require('../view/authentication.js');

async function login(req, resp)
{
    const userName = req.params.userName;
    const password = req.body.password;
    let [indexOfUser,isCustomerExist] = Customer.findCustomer(userName);
    if(indexOfUser == -1)
    {
        resp.status(504).send("No user Exists with this userName")
        return;
    }
    let isPasswordMatch = await Customer.allCustomers[indexOfUser].comparePassword(password);
    if(!isCustomerExist || isPasswordMatch == false)
    {
        resp.status(504).send("Invalid Credentials")
        return;
    }
    const newPayload = new JWTPayload(Customer.allCustomers[indexOfUser])
    const newToken = newPayload.createToken();
    resp.cookie("mytoken",newToken)
    //,{
    //    expires:new Date(Date.now()+1*100000)
    //}
    resp.status(200).send("Loggin Done");
}

module.exports = {login};