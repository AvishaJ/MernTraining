const Credential = require('./credentials')
const Tests = require('./test')
const Stack = require('./stack');
const bcrypt = require('bcrypt');
class User
{
    static allUsers = [];
    constructor(firstName,lastName,role,experience,country,stack,credentials,test)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.credentials = credentials;
        this.role = role;
        this.experience = experience;
        this.country = country;
        this.stack = stack;
        this.test = test;
        this.totalTestScore = 0;
        this.outOffScore = 0;
        for(let index = 0; index<this.test.length; index++)
        {
            this.outOffScore += this.test[index].outOffScore;
        }
    }

    async createNewUser(firstName,lastName,experience,country,frontend,backend,dataBase,userName,password)
    {
        let [isCredentialCreated,message,newCredential] = Credential.createCredential(userName,password);
        if(isCredentialCreated==false)
        {
            return [null,message];
        }
        let newStack = new Stack(frontend,backend,dataBase);
        let role = "user";
        let test = Tests.getTest(newStack);
        newCredential.password = await newCredential.getHashPassword();
        let newUser = new User(firstName,lastName,role,experience,country,newStack,newCredential,test);
        User.allUsers.push(newUser);
        return [newUser,"User Created Successfully"];
    }

    static async createAdmin(firstName,lastName,experience,country,frontend,backend,dataBase,userName,password)
    {
        const role = "admin";
        const [flag,message,newCredential] = Credential.createCredential(userName,password);
        if(flag === false)
        {
            return [null,"Username already Exist"];
        }
        let newStack = new Stack(frontend,backend,dataBase);
        let test = Tests.getTest(newStack);
        newCredential.password = await newCredential.getHashPassword();
        const admin = new User(firstName,lastName,role,experience,country,newStack,newCredential,test)
        User.allUsers.push(admin);
        return [admin,"Admin created Successfully"];
    }

    async comparePassword(password)
    {
        let isPasswordMatch = await bcrypt.compare(password,this.credentials.password);
        return isPasswordMatch;
    }

    isUserTech(tech)
    {
        if(this.stack.frontend == tech || this.stack.backend == tech || this.stack.dataBase == tech)
        {
            for(let index=0; index<this.test.length; index++)
            {
                if(this.test[index].tech==tech)
                return [true,index,"Tech Exist"];
            }
            return [false,-1,"Tech has no Test"]
        }
        return [false,-1,"This tech is not in the userList"];
    }

    updateUserScore()
    {
        this.totalTestScore =0;
        for(let index = 0; index<this.test.length; index++)
        {
            this.totalTestScore += this.test[index].score;
        }
    }

    static findUser(userName)
    {
        for(let index = 0; index<User.allUsers.length; index++)
        {
            if(User.allUsers[index].credentials.userName == userName)
            {
                return [index,true];
            }
        }
        return [-1,false];
    }
    
    allTestAttempted()
    {
        for(let index=0; index<this.test.length; index++)
        {
            if(this.test[index].isAttempted != true)
            return [false,"All Test not Attempted"];
        }
        return [true,"All Test Attempted"];
    }

    updateFirstname(newFirstname) {
        this.firstName = newFirstname;
    }
    
    updateLastName(newlastname) {
        this.lastName = newlastname;
    }

    updateCountry(country){
        this.country = country;
    }

    updateExper(experience){
        this.experience = experience;
    }

    update(propertyToUpdate, value)
    {
        switch (propertyToUpdate) 
        {
            case "firstName": 
                this.updateFirstname(value)
                return true;

            case "lastName": 
                this.updateLastName(value)
                return true;

            case "country":
                this.updateCountry(value)
                return true;
                            
            case "experience":
                this.updateExper(value)
                return true;
                
            default: return false;
        }
    }
}

module.exports = User;