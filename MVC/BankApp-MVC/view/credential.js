const uuid = require('uuid');
const bcrypt = require('bcrypt');
class Credential
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

    static findCustomerName(userName)
    {
        for(let index = 0; index <Credential.allCredentials.length; index++)
        {
            if(Credential.allCredentials[index].userName == userName)
            {
                return [true,index];
            }
        }
        return [false,-1];
    }

    static createCredential(userName, password)
    {
        let [isuserNameExist,indexOfuserName] = Credential.findCustomerName(userName);
        if(isuserNameExist)
        {
            return [false,"userName Already Exist",null]
        }
        let newCredential = new Credential(userName,password);
        Credential.allCredentials.push(newCredential);
        return [true,"Credential Created",newCredential];
    }
}
module.exports = Credential;