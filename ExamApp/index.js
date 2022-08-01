const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const cookieParser = require('cookie-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

const login = require('./Controllers/Login/controller');
const logout = require('./Controllers/Logout/controller');

const { UserTotalScore, CreateUser, AllUser, createAdmin} = require('./Controllers/User/controller');
const { MakeTest,AllTech, TechScore } = require('./Controllers/Test/controller');
const { CreateQuestion, AttemptTest } = require('./Controllers/Question/controller');

app.post("/api/v1/login/:userName", async (req,resp)=> login(req,resp));
app.post("/api/v1/logout",(req,resp)=>logout(req,resp));

app.post('/api/v1/createUser', async (req,resp)=>CreateUser(req,resp));
app.get('/api/v1/getAllUser',(req,resp)=> AllUser(req,resp));

app.post('/api/v1/MakeTest',(req,resp)=> MakeTest(req,resp));
app.get('/api/v1/getAlltech',(req,resp)=> AllTech(req,resp));
app.post('/api/v1/createQuestion',(req,resp)=> CreateQuestion(req,resp));


app.post('/api/v1/attemptTest/:userName/:questionId',(req,resp)=>AttemptTest(req,resp));
app.get('/api/v1/ScoreOfTech/:userName/:tech',(req,resp)=>TechScore(req,resp))
app.get('/api/v1/ScoreOfUser/:userName',(req,resp)=> UserTotalScore(req,resp));


app.listen(9000,(req,resp)=>{
    createAdmin();
 console.log("App started at 9000");
})