const JWTPayload = require('../../view/authentication');
const Question = require('../../view/question');
const Tests = require('../../view/test');
const User = require('../../view/user');

function MakeTest(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        resp.status(504).send("please specify this role to admin")
        return;
    }
    const tech = req.body.tech;
    let [indexoFTech,istechExist] = Tests.findIndexOfTech(tech);
    if(istechExist) 
    {
       resp.status(201).send(Tests.allTest[indexoFTech].question); 
       return
    }
    
    const newTest = new Tests(tech);
    Tests.allTest.push(newTest);
    
    resp.status(201).send("Tech Created Successfully");
    return;
}

function AllTech(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"])
    if(newPayload.role != "admin")
    {
        resp.status(504).send("please specify this role to admin")
        return;
    }
    resp.status(201).send(Tests.allTest)
    return
}

function TechScore(req,resp)
{
    const {userName,tech} = req.params;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        if(newPayload.userName != userName)
        {
            resp.status(504).send("please Login with correct Id")
            return;
        }
        let [index,isUserExist] = User.findUser(userName);
        if(!isUserExist)
        {
            resp.status(504).send("User not Exist");
            return;
        }
        let [isTechExist,UserIndexOfTech,messi] = User.allUsers[index].isUserTech(tech);
        if(!isTechExist)
        {
            resp.status(504).send(messi);
            return;
        }
        let [isAttempted,mess]= User.allUsers[index].test[UserIndexOfTech].isTestAttempted();
        if(!isAttempted)
        {
            resp.status(504).send(mess);
            return;
        }
        let testScore = User.allUsers[index].test[UserIndexOfTech].score;
        let outOfScore = User.allUsers[index].test[UserIndexOfTech].outOffScore;
        resp.status(201).send(`${userName} scored ${testScore} out off ${outOfScore} in ${tech} technology`);
        return;
    }
    let [index,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(504).send("User not Exist");
        return;
    }
    let [isTechExist,UserIndexOfTech,messi] = User.allUsers[index].isUserTech(tech);
    if(!isTechExist)
    {
        resp.status(504).send(messi);
        return;
    }
    let [isAttempted,mess]= User.allUsers[index].test[UserIndexOfTech].isTestAttempted();
    if(!isAttempted)
    {
        resp.status(504).send(mess);
        return;
    }
    let testScore = User.allUsers[index].test[UserIndexOfTech].score;
    let outOfScore = User.allUsers[index].test[UserIndexOfTech].outOffScore;
    resp.status(201).send(`${userName} scored ${testScore} out off ${outOfScore} in ${tech} technology`);
    return;
}

module.exports = {MakeTest,AllTech,TechScore}
