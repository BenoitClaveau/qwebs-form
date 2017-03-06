/*!
 * qwebs-form
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
 
"use strict";

const DataError = require("qwebs").DataError;

class FormService {
    constructor() {
    };
    /* Web methods ----------------------------*/

    getPassword(request, response) {
        let password = this.generatePassword();
        return response.send({ request: request, content: { password: password }});
    };

    /* Methods -------------------------------- */

    trim(source) {
        if (!source) return "";
        return source.replace(/\s/g,"");
    };

    formatPhoneNumber(phoneNumber) {
        if (!phoneNumber) return null;
        let temp = this.trim(phoneNumber).replace(/(0033\d|\+33\d|\d{2})(\d{2})(?!$)/g,"$1 $2 ");
        if (temp.indexOf("0033") == 0) temp = "+33" + temp.substr(4, temp.length - 4);
        if (temp.indexOf("+33") == 0) temp = "+33 " + temp.substr(3, temp.length - 3);
        return temp;
    };

    validateLogin(login) {
        if (!login) throw new DataError({ message: "Login is empty." });
        if (login.length == 0) throw new DataError({ message: "Login is empty." });
        if (login.length < 4) throw new DataError({ message: "Login is too short.", data: { login: login }});
        if (login.indexOf(" ") !== -1) throw new DataError({ message: "Login contains space character.", data: { login: login }});
        if (login.indexOf("@") !== -1) throw new DataError({ message: "Login contains @ character.", data: { login: login }});
        
        if (!/^([\w|0-9|\.|\-|\_|áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+)$/gi.test(login)) throw new DataError({ message: "Bad login format.", data: { login: login }});
        
        if (login.indexOf("..") != -1 || login.indexOf("--") != -1) throw new DataError({ message: "Bad login format.", data: { login: login }});
        if (login[0] == "." || login[0] == "-") throw new DataError({ message: "Bad login format.", data: { login: login }});
        
        let lastChar = login[login.length -1];
        if (lastChar == "." || lastChar == "-") throw new DataError({ message: "Bad login format.", data: { login: login }});
    };

    validateEmail(email) {
        if (!email) throw new DataError({ message: "Email isn't defined." });

        if (!/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(email)) 
            throw new DataError({ message: "Bad email format." });
    }

    validatePhoneNumber(phoneNumber) {
        if (!phoneNumber) throw new DataError({ message: "Phone number isn't defined." });

        if (!/^((\+|00)33\s?|0)[1-9](\s?\d{2}){4}$/i.test(phoneNumber)) 
            throw new DataError({ message: "Bad phone number format.", data: { phoneNumber: phoneNumber }});
    }

    validatePassword(password) {
        if (!password) throw new DataError({ message: "Password is not defined." });

        if (/d+/.test(password) == false) throw new DataError({ message: "Password must contain at least one digit." });

        if (password.length < 4) throw new DataError({ message: "Password is too short." });
        if (password.length > 100) throw new DataError({ message: "Password is too long." });
        
        return true;
    };

    generatePassword() {
        let keylist="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let keylist2 = keylist + "_-+&*."

        let password = keylist.charAt(Math.floor(Math.random() * keylist.length));
        for (let i = 0; i < 8; i++)
            password += keylist2.charAt(Math.floor(Math.random() * keylist2.length));
        password += keylist.charAt(Math.floor(Math.random() * keylist.length));

        if (/d+/.test(password) == false) return generatePassword();

        return password;
    };
};

exports = module.exports = FormService;