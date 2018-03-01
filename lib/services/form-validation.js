/*!
 * qwebs
 * Copyright(c) 2018 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */ 
const { Error, UndefinedError } = require("oups");

class FormaValidationService {
    constructor() {
    };

    login(login) {
        if (!login) throw new UndefinedError("Login");
        if (login.length < 4) throw new Error("Login is too short.", { login: login });
        if (login.indexOf(" ") !== -1) throw new Error("Login contains space character ${login}.", { login: login });
        if (login.indexOf("@") !== -1) throw new Error("Login contains @ character ${login}.", { login: login });
        
        if (!/^([\w|0-9|\.|\-|\_|áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+)$/gi.test(login)) throw new Error("Bad login format.", { login: login });
        
        if (login.indexOf("..") != -1 || login.indexOf("--") != -1) throw new Error("Bad login format ${login}.", { login: login });
        if (login[0] == "." || login[0] == "-") throw new Error("Bad login format ${login}.", { login: login });
        
        let lastChar = login[login.length -1];
        if (lastChar == "." || lastChar == "-") throw new Error("Bad login format ${login}.", { login: login });
        return true;
    };

    email(email) {
        if (!email) throw new UndefinedError("Email");

        if (!/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(email)) 
            throw new Error("Bad email format.");
        return true;
    }

    phoneNumber(phoneNumber) {
        if (!phoneNumber) throw new UndefinedError("Phone number");

        if (!/^((\+|00)33\s?|0)[1-9](\s?\d{2}){4}$/i.test(phoneNumber)) 
            throw new Error("Bad phone number format ${phoneNumber}.", { phoneNumber: phoneNumber });
        return true;
    }

    password(password) {
        if (!password) throw new UndefinedError("Password");

        if (/\d/.test(password) == false) throw new Error("Password must contain at least one digit." );

        if (password.length < 4) throw new Error("Password is too short.");
        if (password.length > 100) throw new Error("Password is too long.");
        
        return true;
    };
};

exports = module.exports = FormaValidationService;