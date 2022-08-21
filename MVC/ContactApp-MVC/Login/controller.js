const User = require('../view/User.js');
const JWTPayload = require('../view/authentication.js');
async function login(req, resp)
{
    const userName = req.body.userName;
    const password = req.body.password;
    
    if (typeof userName != "string") {
        resp.status(406).send("userName is invalid");
        return;
    }

    if (typeof password != "string") {
        resp.status(406).send("password is invalid");
        return;
    }

    let [indexOfUser,isUsenameExist] = User.findUser(userName);
    if(!isUsenameExist)
    {
        resp.status(403).send("UserName Not Exist");
        return;
    }
    let isPassword = await User.allUsers[indexOfUser].comparePassword(password);
    if(isPassword == false)
    {
        resp.status(403).send("Invalid Credentials")
        return;
    }
    const newPayload = new JWTPayload(User.allUsers[indexOfUser])
    const newToken = newPayload.createToken();
    resp.cookie("mytoken",newToken)
    //,{
    //    expires:new Date(Date.now()+1*100000)
    //}
    resp.status(201).send(User.allUsers[indexOfUser]);
}
module.exports = login;