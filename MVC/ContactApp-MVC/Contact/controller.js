const JWTPayload = require('../view/authentication');
const User = require('../view/User.js')
function createContact(req,resp)
{
    const userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.userName != userName){
        resp.status(401).send("please login with correct userName")
        return;
    }
    const {firstName,lastName} = req.body;

    if (typeof firstName != "string") {
        resp.status(406).send("Firstname is invalid");
        return;
    }

    if (typeof lastName != "string") {
        resp.status(406).send("LastName is invalid");
        return;
    }

    let [indexOfUser,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(403).send("User not Exist");
       return;
    }
    let [newContact,message] = User.allUsers[indexOfUser].createNewContact(firstName,lastName);
    if(newContact==null)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(newContact);
    return message;
}

function getAllContacts(req,resp)
{
    const userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.userName != userName){
        resp.status(401).send("please login with correct userName")
        return;
    }
    const [indexOfUser,isUserExist] = User.findUser(userName)
    if(!isUserExist){
        resp.status(403).send("User not Exist");
       return;
    }

    resp.status(201).send(User.allUsers[indexOfUser].contacts)
}

function deleteContact(req,resp)
{
    let userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.userName != userName){
        resp.status(401).send("please login with correct userName")
        return;
    }
    let {firstName,lastName} = req.params;
    let fullName = `${firstName} ${lastName}`;
    let [indexOfUser,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(403).send("User not Exist");
       return;
    }
    let [isContactDeleted,message] = User.allUsers[indexOfUser].deleteUserContact(fullName);
    if(!isContactDeleted)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(message);
    return;
}

module.exports = {createContact,getAllContacts,deleteContact};