const User = require('../view/User.js');
const JWTPayload = require('../view/authentication.js')
function createContactDetail(req,resp)
{
    let userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.userName != userName){
        resp.status(401).send("please login with correct userName")
        return;
    }
    let [indexOfUser,isUserExist] = User.findUser(userName)
    if(!isUserExist)
    {
        resp.status(403).send("User not Found");
        return;
    }
    let firstName = req.params.firstName;
    let lastName = req.params.lastName;
    let fullName = `${firstName} ${lastName}`;
    let [indexOfContact,isContactExist] = User.allUsers[indexOfUser].indexOfContact(fullName);
    if(!isContactExist)
    {
        resp.status(403).send("Contact doesnt Exist")
        return;
    }
    const {type,value} = req.body;

    if (typeof type != "string") {
        resp.status(406).send("Type is invalid");
        return;
    }

    if (typeof value != "string" || typeof value != "number") {
        resp.status(406).send("value is invalid");
        return;
    }

    let [isContactDetailsAdded,message] = User.allUsers[indexOfUser].contacts[indexOfContact].createContactDetails(type,value);
    if(!isContactDetailsAdded){
        resp.status(403).send(message)
        return;
    }
    resp.status(201).send(message);
    return message;
}

module.exports = createContactDetail;