const JWTPayload = require('../../view/authentication');
const User = require('../../view/user');
const Question = require('../../view/question');
const Tests = require('../../view/test');

let [admin,message] = [null,"Already exist"]
async function createAdmin()
{
    [admin,message] = await User.createAdmin("Avisha","Jain",10,"India","react","python","mysql","avi","avi")
    return
}

async function CreateUser(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"])
    if(newPayload.role != "admin")
    {
        resp.status(504).send("please specify this role to admin")
        return;
    }
    const {firstName,lastName,experience,country,frontend,backend,dataBase,userName,password} = req.body
    let [isUserCreated,message] = await admin.createNewUser(firstName,lastName,experience,country,frontend,backend,dataBase,userName,password)
    if(isUserCreated == null)
    {
        resp.status(504).send(message)
        return
    }
    resp.status(201).send(isUserCreated)
    return 
}


function AllUser(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"])
    if(newPayload.role != "admin")
    {
        resp.status(504).send("please specify this role to admin")
        return;
    }
    resp.status(201).send(User.allUsers)
    return
}


function UserTotalScore(req,resp)
{
    const userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"])
    if(newPayload.role != "admin")
    {
        if(newPayload.userName != userName)
        {
            resp.status(504).send("Kindly login with correct username ;)")
            return;
        }
        let [index,isUserExist] = User.findUser(userName)
        if(!isUserExist)
        {
            resp.status(504).send("User doesnt Exist")
            return;
        }
        let [isAttempted,mess]= User.allUsers[index].allTestAttempted()
        if(!isAttempted)
        {
            resp.status(504).send(mess)
            return;
        }
        let testScore = User.allUsers[index].totalTestScore;
        let outOfScore = User.allUsers[index].outOffScore;
        resp.status(201).send(`Total score score by ${userName} is ${testScore} out off ${outOfScore}`)
        return;
    }
    let [index,isUserExist] = User.findUser(userName)
    if(!isUserExist)
    {
        resp.status(504).send("User doesnt Exist")
        return
    }
    let [isAttempted,mess]= User.allUsers[index].allTestAttempted()
    if(!isAttempted)
    {
        resp.status(504).send(mess)
        return
    }
    let testScore = User.allUsers[index].totalTestScore
    let outOfScore = User.allUsers[index].outOffScore
    resp.status(201).send(`Total score score by ${userName} is ${testScore} out off ${outOfScore}`)
    return
}

module.exports = {UserTotalScore,CreateUser,AllUser,createAdmin}