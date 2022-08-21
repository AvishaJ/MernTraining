const jwt = require("jsonwebtoken")
const Credential = require("./credential")
class JWTPayload{
    static secretKey = "strongPassword";
    constructor(user){
        this.userName = user.credential.userName;
        this.role = user.role;
        this.firstName = user.firstName;
        this.isActive = user.isActive;
    }
    createToken()
    {
        return jwt.sign(JSON.stringify(this),JWTPayload.secretKey)
    }
    static verifyCookie(token)
    {
        return jwt.verify(token,JWTPayload.secretKey)
    }
    static isValidateToken(req,resp,mytoken)
    {
        if (!mytoken) {
            return false
        }
        return JWTPayload.verifyCookie(mytoken)
    }
}

module.exports = JWTPayload;