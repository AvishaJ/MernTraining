const uuid = require('uuid');
const bcrypt = require('bcrypt');
class Credential
{
    static allCredentials = [];
    constructor(userName,password)
    {
        this.credentialID = uuid.v4();
        this.userName = userName;
        this.password = password;
    }

    async getHashPassword(){
        return bcrypt.hash(this.password,10);
    }

    static isUserNameExist(userName)
    {
        if(Credential.allCredentials.length == 0) return [-1,false];
        for(let index=0; index<Credential.allCredentials.length; index++)
        {
            if(Credential.allCredentials[index].userName == userName)
            {
                return [index,true];
            }
        }
        return [-1,false];
    }

    static createCredential(userName,password)
    {
        let [indexOfUserName,isUserNameExist] = Credential.isUserNameExist(userName);
        if(isUserNameExist)
        {
            return [false,"userName Already Exist",null]
        }
        let newCredential = new Credential(userName,password);
        Credential.allCredentials.push(newCredential);
        return [true,"Credential Created",newCredential];
    }

}
module.exports = Credential;