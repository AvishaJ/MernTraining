const uuid = require('uuid');
const bcrypt = require('bcrypt');
class Credentials
{
    static allCredentials = [];
    constructor(userName, password)
    {
        this.userName = userName;
        this.password = password;
        this.CredentialId = uuid.v4();
    }

    async getHashPassword(){
        return bcrypt.hash(this.password,10);
    }

    static finduserName(userName)
    {
        for(let index = 0; index <Credentials.allCredentials.length; index++)
        {
            if(Credentials.allCredentials[index].userName == userName)
            {
                return [true,index];
            }
        }
        return [false,-1];
    }

    static createCredential(userName, password)
    {
        let [isuserNameExist,indexOfuserName] = Credentials.finduserName(userName);
        if(isuserNameExist)
        {
            return [false,"userName Already Exist",null]
        }
        let newCredential = new Credentials(userName,password);
        Credentials.allCredentials.push(newCredential);
        return [true,"Credential Created",newCredential];
    }
}
module.exports = Credentials;