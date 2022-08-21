const JWTPayload = require('../../view/authentication');
const Question = require('../../view/question');
const Tests = require('../../view/test');
const User = require('../../view/user');

function MakeTest(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        resp.status(504).send("Only admin can make test")
        return;
    }
    const tech = req.body.tech;
    let [indexoFTech,istechExist] = Tests.findIndexOfTech(tech);
    if(istechExist) {
       resp.status(201).send(Tests.allTest[indexoFTech].question)
       return
    }
    
    const newTest = new Tests(tech);
    Tests.allTest.push(newTest);
    
    resp.status(201).send("Test Created Successfully");
    return;
}

// function AllTech(req,resp)
// {
//     let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
//     if(newPayload.role != "admin")
//     {
//         resp.status(504).send("please specify this role to admin")
//         return;
//     }
//     resp.status(201).send(Tests.);
//     return;
// }

function TechScore(req,resp)
{
    const {userName,tech} = req.params;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        if(newPayload.userName != userName)
        {
            resp.status(504).send("please Login with proper usrname")
            return;
        }
        let [index,isUserExist] = User.findUser(userName);
        if(!isUserExist)
        {
            resp.status(504).send("User doesnt Exist");
            return;
        }
        let [isTechExist,UserIndexOfTech,message] = User.allUsers[index].isUserTech(tech);
        if(!isTechExist)
        {
            resp.status(504).send(message);
            return;
        }
        let [isAttempted,msg]= User.allUsers[index].test[UserIndexOfTech].isTestAttempted();
        if(!isAttempted)
        {
            resp.status(504).send(msg);
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
    let [isTechExist,UserIndexOfTech,message] = User.allUsers[index].isUserTech(tech);
    if(!isTechExist)
    {
        resp.status(504).send(message);
        return;
    }
    let [isAttempted,msg]= User.allUsers[index].test[UserIndexOfTech].isTestAttempted();
    if(!isAttempted)
    {
        resp.status(504).send(msg);
        return;
    }
    let testScore = User.allUsers[index].test[UserIndexOfTech].score;
    let outOfScore = User.allUsers[index].test[UserIndexOfTech].outOffScore;
    resp.status(201).send(`${userName} scored ${testScore} out off ${outOfScore} in ${tech} technology`);
    return;
}

function SubmitTest(req,resp)
{

    const {userName,tech} = req.params;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "user")
    {
        resp.status(504).send("Login as User")
        return;
    }
    if(newPayload.userName != userName )
    {
        resp.status(504).send("Enter correct UserName")
        return;
    }
    let j = 1
    for(let q in req.body)
    {
        if(q != "que"+String(j)){
            resp.status(403).send("Question no. is not correct"+j)
            return
        }
        if(typeof(req.body[q])!="number"){
            resp.status(403).send("Please pass a number instead of this in que"+j)
            return
        }
        if(req.body[q]!=1 && req.body[q]!=2 && req.body[q]!=3 && req.body[q]!=4){
            resp.status(403).send("There are only for options, So Choose wisely for que "+j)
            return
        }
        j++
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
    if(isAttempted == true)
    {
        resp.status(504).send(mess);
        return;
    }
    const user = User.allUsers[index].test[UserIndexOfTech];
    if(user.question.length == 0)
    {
        user.isAttempted = true;
        user.score = 0;
        user.outOffScore = 0;
        resp.status(504).send("Test have not any question");
        return;
    }
    j = 0  
    for (let ans in req.body)
    {
        user.question[j].selectedAnswer += user.question[j].options[req.body[ans]-1];
        j++;
    }
    User.allUsers[index].test[UserIndexOfTech].updateTestScore();
    User.allUsers[index].test[UserIndexOfTech].testAttempted();
    User.allUsers[index].updateUserScore();
    resp.status(504).send("Test is submitted");
    return;
}

module.exports = {MakeTest,TechScore,SubmitTest}