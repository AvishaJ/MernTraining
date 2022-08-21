const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uuid = require('uuid')
const app = express();
const cookieParser = require('cookie-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

const { createBank,getAllBank } = require('./Bank/controller.js');
const { createBankManager,createCustomer, getAllCustomer, getAllAccount, withDraw, deposit, transfer, selftransfer } = require('./Customer/controller');
const { login } = require('./Login/controller');
const { createNewAccount } = require('./Account/controller');
const logout = require('./Logout/controller');

app.post("/api/v1/login/:userName", async (req,resp)=>login(req,resp));
app.post("/api/v1/logout",(req,resp)=>logout(req,resp));

app.post("/api/v1/createBank",(req, resp)=>createBank(req,resp));
app.get("/api/v1/getAllBank",(req, resp)=>getAllBank(req,resp));
app.post("/api/v1/createCustomer",async (req, resp)=>createCustomer(req,resp));
app.get("/api/v1/getAllCustomer",(req, resp)=>getAllCustomer(req,resp));
app.post("/api/v1/createNewAccount/:newCustomer",(req,resp)=>createNewAccount(req,resp));
app.post("/api/v1/UserAllAccount/:userName",(req,resp)=>getAllAccount(req,resp));

app.post("/api/v1/withDraw/:userName",(req,resp)=>withDraw(req,resp));
app.post("/api/v1/deposit/:userName",(req,resp)=>deposit(req,resp));
app.post("/api/v1/transfer/:debitCustomer",(req,resp)=>transfer(req,resp));
app.post("/api/v1/selftransfer/:creditCustomer",(req,resp)=>selftransfer(req,resp));

app.listen(9000,()=>{
    createBankManager();
    console.log("App is started at port 9000");
})