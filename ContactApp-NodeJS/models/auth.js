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
    verifyCookie(token) {
        return jwt.verify(token, JWTPayload.secretKey)
    }
}

module.exports = JWTPayload;
