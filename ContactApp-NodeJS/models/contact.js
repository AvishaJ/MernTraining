const uuid = require('uuid');
const ContactDetail = require("./contactDetails.js")

class Contact {

    constructor(firstName, lastName) {
        this.contactId = uuid.v4()
        this.firstName = firstName
        this.lastName = lastName
        this.isContactActive = true
        this.contactDetails = []
    }

    createContactDetails(type, value) {
        if (this.isActive == false) {
            return [false, null]
        }
        const newcontactDetails = new ContactDetail(type, value)
        this.contactDetails.push(newcontactDetails)
        return [true, newcontactDetails]
    }

    isContactExist(fullName) {
        if (this.isContactActive == false) {
            return false
        }
        if (`${this.firstName} ${this.lastName}` == fullName)
            return true
    }

    deleteContact() {
        if (this.isContactActive == false) {
            return [false, "Contact Not Active"]
        }
        this.isContactActive = false
        return [true, "Contact Successfully Deleted"]
    }
}

module.exports = Contact;