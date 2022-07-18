class User {
    static allUsers = [];
    static userId = 0;
    constructor(firstName, lastName, userName, role) {
        this.userId = User.userId++
        this.firstName = firstName
        this.lastName = lastName
        this.userName = userName
        this.role = role
        this.isActive = true

    }

    creatNewUser(firstName, lastName, userName, role) {

        if (this.role == "admin") {
            let [indexOfUser,isUserExists] = User.#findUser(userName)
            if (isUserExists) {
                return [-1,"Username exists,Try with another username"]
            }

        }

        let newUser = new User(firstName, lastName, userName, role)
        User.allUsers.push(newUser)
        return [newUser, "New user is created"]


    }

    deleteUser(userName) {
        if (this.isActive == false) {
            return [false, "User not active"]
        }

        if (this.role != "admin") {
            return ["only admin can delete user"]
        }

        let [isUserExists, indexOfUser] = User.findUser(userName)
        if (!isUserExists) {
            return ["Username does not exists"]
        }

        User.allUsers[indexOfUser].isActive = false
        return [true, "user deleted"]

    }

    static #findUser(userName) {
        if (this.isActive == false) {
            return ["No user exists",false]
        }
        for (let index = 0; index < User.allUsers.length; index++) {
            if (userName == User.allUsers[index].userName) {
                return ["User Exists",true ]
            }
        }
        return["No User Exists",false]

    }

}

class Contact {
    static contactId = 0
    constructor(firstName, lastName) {
        this.contactId = Contact.contactId++
        this.firstName = firstName
        this.lastName = lastName
        this.isActive = true
        this.allContact = []

    }

    createContact(firstName, lastName) {
        if (this.isActive == false) {
            return ["not a valid user"]
        }
        const newContact = new Contact(firstName, lastName)
        Contact.allContact.push(newContact)
        return [newContact, "Contact Created"]
    }

    isContactExists(firstName) {
        if (this.isActive == false) {
            return ["no contact Exists"]
        }
        return [this.firstName + this.lastName]

    }

    displayContacts() {
        if (this.isActive == false) {
            return ["not a valid user"]
        }

        for (let index = 0; index < allContact.length; index++) {
            const allContactDisplay = allContact[index];
            console.log(allContactDisplay)

        }
    }

    deleteContact() {
        if (this.isActive == false) {
            return [false, "no Contact"]
        }
        else {
            this.isActive = false
            return [true, "Deleted"]
        }
    }

}

class ContactDetails {
    static contactDetailsId = 0
    constructor(contactDetailsId, firstName, type, value) {
        this.contactDetailsId = contactDetailsId++
        this.firstName = firstName
        this.type = type
        this.value = value

    }

}

let admin = new User("avisha", "jain", "avijain", "admin")
console.log(admin)

let [avish,message]=admin.creatNewUser("avish", "jain", "avee", "user");
console.log(avish)
