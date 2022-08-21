const jwt = require("jsonwebtoken")
class JWTPayload{
    static secretKey = "strongPassword";
    constructor(user){
        this.userName = user.credentials.userName;
        this.fullName = user.fullName;
        this.customerID = user.customerID;
        this.role = user.role;
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