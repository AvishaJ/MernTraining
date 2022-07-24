const jwt = require("jsonwebtoken")
const Credentials = require("./credentail")
class JWTPayload {
    static secretKey = "Password@123"
    constructor(user) {
        this.userName = user.credential.userName
        this.firstName = user.firstName
    }
    createToken() {
        return jwt.sign(JSON.stringify(this), JWTPayload.secretKey)
    }
    static verifyCookie(token) {
        return jwt.verify(token, JWTPayload.secretKey)
    }

    static isValidCustomer(req,resp)
    {
        const myToken = req.cookies["myToken"]
        if(!myToken)
        {
            resp.status(504).send("Please login")
            return false
        }

        const newPayload = JWTPayload.verifyCookie(myToken)
        if(!newPayload.userName != userName)
        {
            resp.status(504).send(" login required")
            return false
        }
        return true
    }

    
}

module.exports = JWTPayload;


