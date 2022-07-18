const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uuid = require('uuid');
const User = require('./models/user')
const { allUsers } = require('./models/user');
const Contact = require('./models/contact');
const JWTPayload = require('./models/auth');
const app = express();
app.use(cors())
app.use(bodyParser.json())

const [admin, message] = User.createAdmin()

app.post("/api/v1/login", (req, resp) => {
    const { userName, password } = req.body
    let [indexOfUser, isUsenameExist] = User.findUser(userName);
    if (!isUsenameExist || User.allUsers[indexOfUser].credential.password != password) {
        resp.status(504).send("Invalid Credentials")
        return;
    }
    const newPayload = new JWTPayload(User.allUsers[indexOfUser])
    const newToken = newPayload.createToken()
    resp.cookie("myToken", newToken),
    {
        expires: new Date(Date.now() + 1 * 10000)
    }
    resp.status(200).send("Logged in")
})

app.post("/api/v1/createNewUser", (req, resp) => {
    let { firstName, lastName, userName, password, role } = req.body
    let [newUser, message] = admin.createNewUser(firstName, lastName, userName, password, role)
    if (newUser == null) {
        resp.status(504).send(message)
        return
    }
    resp.status(201).send(newUser)
    return message
})

app.get("/api/v1/getUser", (req, resp) => {
    resp.status(201).send(User.allUsers)
})

app.put("/api/v1/updateUser", (req, resp) => {
    let { userName, propertyToUpdate, value } = req.body
    let [indexOfUser, isUserExist] = User.findUser(userName)
    if (!isUserExist) {
        resp.status(504).send("User doesn't exist")
        return
    }
    const isUpdate = User.allUsers[indexOfUser].update(propertyToUpdate, value)
    if (!isUpdate) {
        resp.status(504).send("User not Updated")
        return
    }
    resp.status(201).send(User.allUsers)
    return
})

app.post("/api/v1/createContact/:userName", (req, resp) => {
    const { firstName, lastName } = req.body
    const userName = req.params.userName
    let [indexOfUser, isUserExist] = User.findUser(userName)
    if (!isUserExist) {
        resp.status(504).send("User doesn't Exist")
        return
    }
    let [newContact, message] = User.allUsers[indexOfUser].createNewContact(firstName, lastName)
    if (newContact == null) {
        resp.status(504).send(message)
        return
    }
    resp.status(200).send(newContact)
    return message
})

app.post("/api/v1/createContactDetail/:userName/:firstName/:lastName", (req, resp) => {
    let userName = req.params.userName
    let [indexOfUser, isUserExist] = User.findUser(userName)
    if (!isUserExist) {
        resp.status(504).send("User not Found")
        return;
    }
    let firstName = req.params.firstName
    let lastName = req.params.lastName
    let fullName = this.firstName + this.lastName
    console.log(fullName)
    let [indexOfContact, isContactExist] = User.allUsers[indexOfUser].indexOfContact(fullName)
    if (!isContactExist) {
        resp.status(504).send("Contact doesn't Exist")
        return
    }
    const { type, value } = req.body;
    let [isContactDetailsAdded, newContactDetail] = User.allUsers[indexOfUser].contacts[indexOfContact].createContactDetails(type, value);
    resp.status(200).send(newContactDetail);
    return message;
})

app.post("/api/v1/deleteUserContact/:userName", (req, resp) => {
    let userName = req.params.userName
    let { firstName, lastName } = req.body
    let fullName = this.firstName + this.lastName
    let [indexOfUser, isUserExist] = User.findUser(userName)
    if (!isUserExist) {
        resp.status(504).send("User doesn't Exist")
        return
    }
    let [isContactDeleted, message] = User.allUsers[indexOfUser].deleteUserContact(fullName)
    if (!isContactDeleted) {
        resp.status(504).send(message)
        return
    }
    resp.status(200).send(message)
    return
})

app.post("/api/v1/adminDeleteUser", (req, resp) => {
    let userName = req.body
    let [indexOfUser, isUserExist] = User.findUser(userName)
    if (!isUserExist) {
        resp.status(504).send("User doesn't Exist");
        return;
    }
    let [isUserDeleted, message] = admin.adminDeleteUser(userName)
    if (!isUserDeleted) {
        resp.status(504).send(message)
        return;
    }
    resp.status(201).send(message)
    return;
})



app.listen(9000, () => {
    console.log("App Started")
})