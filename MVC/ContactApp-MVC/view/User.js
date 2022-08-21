const Contact = require('./contact.js');
const Credentials = require('./credential');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
class User
{
    static allUsers = [];
    constructor(firstName,lastName,credential,role)
    {
        this.UserId = uuid.v4();
        this.firstName = firstName;
        this.lastName = lastName;
        this.credential = credential;
        this.role = role;
        this.isActive = true;
        this.contacts = [];
    }

    static async createAdmin(username,passworD,firstname,lastname)
    {
        let userName = username;
        const password = passworD;
        const firstName = firstname;
        const lastName = lastname;
        const role = "admin";
        const [flag,message,newCredential] = Credentials.createCredential(userName,password);
        if(flag === false)
        {
            return [null,"Username already Exist"];
        }
        newCredential.password = await newCredential.getHashPassword();
        const admin = new User(firstName,lastName,newCredential,role)
        User.allUsers.push(admin);
        return [admin,"Admin created Successfully"];
    }

    async createNewUser(firstname,lastName,userName, password, role)
    {
        if(this.isActive == false) return [null,"Not able to create an User"];
        if(this.role != "admin") return [null,"Please Specify the role to Admin to create a User"];
        let [indexOfUser,isuserNameexist] = User.findUser(userName)
        if(isuserNameexist){
            return [null,"Already Exists userName"]
        }
        
        const [flag,message,newCredential] = Credentials.createCredential(userName,password);
        if(flag === false)
        {
            return [null,"UserName already Exists"]
        }
        newCredential.password = await newCredential.getHashPassword();
        const newUser = new User(firstname,lastName,newCredential, role);
        User.allUsers.push(newUser);
        return [newUser,"New User created"];
    }

    async comparePassword(password){
        let isPassword = await bcrypt.compare(password, this.credential.password);
        return isPassword;
    }

    static findUser(userName)
    {
        if(this.active == false) return [-1,false];
        for(let index=0; index<User.allUsers.length; index++)
        {
            if(User.allUsers[index].credential.userName == userName)
            return [index,true];
        }
        return [-2,false];
    }

    adminDeleteUser(userName)
    {
        if (this.isActive==false){
            return [false,"User not Exist"];
        }
        if(this.role != "admin") return[false,`Please specify the role to admin to delete ${fullName}`]
        let [indexOfUser, isUserExist] = User.findUser(userName);
        if(isUserExist == false)
        {
            return[false,"User not Exists, Please give the correct name."];
        }
        if(User.allUsers[indexOfUser].isActive == false) return[-1,"User already Deleted"];
        User.allUsers[indexOfUser].isActive = false;
        return [true,"successfully Deleted"];
    }

    createNewContact(firstName,lastName)
    {
        if(this.isActive == false) return [null, "User not found"];
        for(let index =0; index<this.contacts.length; index++)
        {
            if(this.contacts[index].firstName == firstName && this.contacts[index].lastName == lastName)
            return [null,"Name Already Existed, Please choose another Name "];
        }
        let newContact = new Contact(firstName,lastName);
        this.contacts.push(newContact);
        return [newContact,"Contact created Suceefully"];
    }

    indexOfContact(fullName)
    {
        if(this.contacts.length==0) return [-1,false]
        for(let indexofContact=0; indexofContact<this.contacts.length; indexofContact++)
        {
            if(this.contacts[indexofContact].isContactExist(fullName))
            return[indexofContact,true];
        }
        return [-1,false];
    }

    deleteUserContact(fullName)
    {
        if(this.isActive == false) return[false, "User not found"];
        let [indexofContact,iscontactexist] = this.indexOfContact(fullName);
        if(iscontactexist == false) return [false, "User not found"];
        if(this.contacts[indexofContact].deleteContact()) 
        return[true,"Contact Deleted"];
        return [false,"Contact not exist"]
    }

    getContact(fullName)
    {
        let [indexofContact,iscontactexist] = this.indexOfContact(fullName);
        if(iscontactexist == false) 
        {
            return ([false, "User not found"]);
        }
        console.log(this.contacts[indexofContact].contactDetails);
    }
    
    updateFirstname(newFirstname) {
        this.firstName = newFirstname;
    }
    updateLastName(newlastname) {
        this.lastName = newlastname;
    }
    updateUserName(value){
        this.credential.userName = value
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
            
            case "userName":
                this.updateUserName(value)
                return true;

            default: return false;
        }
    }
}
module.exports = User;