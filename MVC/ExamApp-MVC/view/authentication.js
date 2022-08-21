const jwt = require("jsonwebtoken")
const Credential = require("./credentials")
class JWTPayload{
    static secretKey = "password@123";
    constructor(user){
        this.userName = user.credentials.userName
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.role = user.role
        this.experience = user.experience
    }
    createToken()
    {
        return jwt.sign(JSON.stringify(this),JWTPayload.secretKey)
    }
    static verifyCookie(token)
    {
        return jwt.verify(token,JWTPayload.secretKey)
    }

    static isValidateToken(req, resp, mytoken) {
        if (!mytoken) {
            return false
        }
        return JWTPayload.verifyCookie(mytoken)
    }


}

module.exports = JWTPayload;