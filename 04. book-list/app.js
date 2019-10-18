// Model Controler
class Model {
    //contacts = contacts = JSON.parse(localStorage.getItem('phoneBook')) || [];

    constructor() {
        this.contacts = JSON.parse(localStorage.getItem('phoneBook')) || [];
    }

    addContact(data) {
        this.contacts.push(new Contact(data));
    }

    get data() {
        return this.contacts;
    }
}

// UI Controler
class View {
    constructor() {

    }
}

// Global Controler
class Controler {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    bindAddContact(data) {
        this.model.addContact(data);
    }
}

class Contact {
    /*
    contructor(id, firstName, lastName, userName, city, state, zipCode) {
        this.data = {
            id,
            firstName,
            lastName,
            userName,
            city,
            state,
            zipCode,
        }
    }
    */

    contructor(data) {
        this.data = data;
    }

    get data() {
        /*
        if(options) {
            let result = {};
            for(prop in options) {
                if(this.data[prop]) {
                    result[prop] = options[prop];
                }
            }
            return result;
        }
        */
        return this.data;
    }

    set data(options) {
        if(options) {
            for(prop in options) {
                if(this.data[prop]) {
                    this.data[prop] = options[prop];
                }
            }
        }
    }

    get fullName() {
        return `${this.data({firstName})} ${this.data({lastName})}`;
    }
}

const app = new Controler(new Model(), new View());
