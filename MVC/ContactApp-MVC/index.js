const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uuid = require('uuid')
const app = express();
const cookieParser = require('cookie-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())


const login = require('./Login/controller.js');
const logout = require('./Logout/controller.js');
const createContactDetail = require('./ContactDetail/controller.js');
const {createUser,getAllUser,adminDeleteUser, updateUser,createAdmin} = require('./User/controller.js');
const {createContact,getAllContacts,deleteContact} = require('./Contact/controller.js')


app.post("/api/v1/login", async (req,resp)=> login(req,resp));

app.post("/api/v1/createuser",async(req,resp) =>  createUser(req,resp));

app.get("/api/v1/getUser",(req,resp)=>getAllUser(req,resp));

app.put("/api/v1/:userName/updateUser",(req,resp)=>updateUser(req,resp));

app.post("/api/v1/createContact/:userName",(req,resp)=>createContact(req,resp));

app.get("/api/v1/getAllContacts/:userName",(req,resp)=> getAllContacts(req,resp));

app.post("/api/v1/createContactDetail/:userName/:firstName/:lastName",(req,resp)=>createContactDetail(req,resp));

app.post("/api/v1/deleteUserContact/:userName/:firstName/:lastName",(req,resp)=>deleteContact(req,resp));

app.post("/api/v1/adminDeleteUser/:userName",(req,resp)=>adminDeleteUser(req,resp));

app.post("/api/v1/logout",(req,resp)=>logout(req,resp));

app.listen(9000,()=>{
    createAdmin()
    console.log("app is started at port 8082");
})