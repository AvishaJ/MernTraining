const jwt = require("jsonwebtoken")
const Credential = require("./credential")
class JWTPayload {
    static secretKey = "Password@123"
    constructor(user) {
        this.userName = user.credential.userName
        this.role = user.role
        this.firstName = user.firstName
        this.isActive = user.isActive
    }
    createToken() {
        return jwt.sign(JSON.stringify(this), JWTPayload.secretKey)
    }
    static verifyCookie(token) {
        return jwt.verify(token, JWTPayload.secretKey)
    }

    static isValidAdmin(req,resp)
    {
        const myToken = req.cookies["myToken"]
        if(!myToken)
        {
            resp.status(504).send("Please login")
            return false
        }

        const newPayload = JWTPayload.verifyCookie(myToken)
        if(newPayload.role != "Admin")
        {
            resp.status(504).send("Required Admin login")
            return false
        }
        return true
    }

    static isValidUser(req,resp)
    {
        const myToken = req.cookies["myToken"]
        if(!myToken)
        {
            resp.status(504).send("Please login")
            return false
        }

        const newPayload = JWTPayload.verifyCookie(myToken)
        if(!newPayload.isActive)
        {
            resp.status(504).send("Required Admin login")
            return false
        }
        return true
    }
}

module.exports = JWTPayload;
