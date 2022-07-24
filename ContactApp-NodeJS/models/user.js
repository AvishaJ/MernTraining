const uuid = require('uuid')
const Contact = require('./contact.js')
const ContactDetail = require('./contactDetails.js')
const Credentials = require('./credential')

class User {

    static allUsers = []
    constructor(firstName, lastName, credential, role) {
        this.UserId = uuid.v4()
        this.firstName = firstName
        this.lastName = lastName
        this.credential = credential
        this.role = role
        this.isActive = true
        this.contacts = []
    }

   

    static createAdmin() {
        const userName = "avisha"
        const password = "avisha123"
        const firstName = "Avisha"
        const lastName = "Jain"
        const role = "Admin"
        const [flag, message, newCredential] = Credentials.createCredential(userName, password)
        const admin = new User(firstName, lastName, newCredential, role)
        User.allUsers.push(admin)
        return [admin, "Admin created Successfully"]
    }

    async createNewUser(firstname, lastName, userName, password, role) {
        if (this.isActive == false) {
            return [null, "user cannot be created"]
        }
        if (this.role != "Admin") {
            return [null, "Please Specify the role to Admin to create a User"]
        }
        let [indexOfUser, isUserNameExist] = User.findUser(userName)
        if (isUserNameExist) {
            return [null, "Username already exists "]
        }
        const newCredential = new Credentials(userName, password)
        newCredential.password= await newCredential.getHashOfPw()
        console.log(newCredential)
        const newUser = new User(firstname, lastName, newCredential, role)
        User.allUsers.push(newUser)
        return [newUser, "User created"]
    }

    static findUser(userName) {
        if (this.active == false) {
            return [-1, false]
        }
        for (let index = 0; index < User.allUsers.length; index++) {
            if (User.allUsers[index].credential.userName == userName)
                return [index, true]
        }
        return [-1, false]
    }

    async comparePassword(password){
        let isPassword = await bcrypt.compare(password, this.credential.password)
        return isPassword;
    }


    adminDeleteUser(userName) {
        if (this.isActive == false) {
            return [false, "User doesn't Exist"]
        }
        if (this.role != "Admin") {
            return [false, "Only admin can delete"]
        }
        let [indexOfUser, isUserExist] = User.findUser(userName)
        if (isUserExist == false) {
            return [false, "Please enter the correct username"]
        }
        if (User.allUsers[indexOfUser].isActive == false) {
            return [-1, "User already Deleted"]
        }
        User.allUsers[indexOfUser].isActive = false
        return [true, "successfully Deleted"]
    }

    createNewContact(firstName, lastName) {
        if (this.isActive == false) return [null, "User not found"]
        for (let index = 0; index < this.contacts.length; index++) {
            if (this.contacts[index].firstName == firstName && this.contacts[index].lastName == lastName)
                return [null, "Name Already Existed, Please choose another Name "]
        }
        let newContact = new Contact(firstName, lastName)
        this.contacts.push(newContact)
        return [newContact, "Contact created Sucessfully"]
    }

    indexOfContact(fullName) {
        if (this.contacts.length == 0) {
            
            return [-1, false]
        }
        for (let indexofContact = 0; indexofContact < this.contacts.length; indexofContact++) {
            if (this.contacts[indexofContact].isContactExist(fullName))
            console.log(this.contacts[indexofContact].isContactExist(fullName))
                return [indexofContact, true]
        }
        return [-1, false]
    }

    deleteUserContact(fullName) {
        if (this.isActive == false) {
            return [false, "User not found"]
        }
        let [indexofContact, iscontactexist] = this.indexOfContact(fullName)
        if (iscontactexist == false) {
            return [false, "User not found"]
        }
        if (this.contacts[indexofContact].deleteContact()) {
            return [true, "Contact Deleted"]
        }
        return [false, "Contact doesn't exist"]
    }

    getContact(fullName) {
        let [indexofContact, iscontactexist] = this.indexOfContact(fullName)
        if (iscontactexist == false) {
            return ([false, "User not found"])
        }
        console.log(this.contacts[indexofContact].contactDetails)
    }

    updateFirstname(newFirstName) {
        this.firstName = newFirstName
    }
    updateLastName(newLastName) {
        this.lastName = newLastName
    }
    update(propertyToUpdate, value) {
        switch (propertyToUpdate) {
            case "firstName":
                this.updateFirstname(value)
                return true

            case "lastName":
                this.updateLastName(value)
                return true

            default: return false
        }
    }
}
module.exports = User;