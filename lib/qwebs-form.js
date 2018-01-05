/*!
 * qwebs-form
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
 
"use strict";

const { Error, UndefinedError } = require("oups");
const { promisify } = require('util');
const crypto = require("crypto");
const cryptoRandomBytes = promisify(crypto.randomBytes);
const cryptoPbkdf2 = promisify(crypto.pbkdf2);

class FormService {
    constructor() {
    };

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
        if (!login) throw new UndefinedError("Login");
        if (login.length < 4) throw new Error("Login is too short.", { login: login });
        if (login.indexOf(" ") !== -1) throw new Error("Login contains space character ${login}.", { login: login });
        if (login.indexOf("@") !== -1) throw new Error("Login contains @ character ${login}.", { login: login });
        
        if (!/^([\w|0-9|\.|\-|\_|áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+)$/gi.test(login)) throw new Error("Bad login format.", { login: login });
        
        if (login.indexOf("..") != -1 || login.indexOf("--") != -1) throw new Error("Bad login format ${login}.", { login: login });
        if (login[0] == "." || login[0] == "-") throw new Error("Bad login format ${login}.", { login: login });
        
        let lastChar = login[login.length -1];
        if (lastChar == "." || lastChar == "-") throw new Error("Bad login format ${login}.", { login: login });
    };

    validateEmail(email) {
        if (!email) throw new UndefinedError("Email");

        if (!/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(email)) 
            throw new Error("Bad email format.");
    }

    validatePhoneNumber(phoneNumber) {
        if (!phoneNumber) throw new UndefinedError("Phone number");

        if (!/^((\+|00)33\s?|0)[1-9](\s?\d{2}){4}$/i.test(phoneNumber)) 
            throw new Error("Bad phone number format ${phoneNumber}.", { phoneNumber: phoneNumber });
    }

    validatePassword(password) {
        if (!password) throw new UndefinedError("Password");

        if (/\d/.test(password) == false) throw new Error("Password must contain at least one digit." );

        if (password.length < 4) throw new Error("Password is too short.");
        if (password.length > 100) throw new Error("Password is too long.");
        
        return true;
    };

    generatePassword(secret) {
        if (!secret) throw new UndefinedError("Secret");

        let keylist="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let keylist2 = keylist + "_-+&*."

        let value = keylist.charAt(Math.floor(Math.random() * keylist.length));
        for (let i = 0; i < 4; i++)
            value += keylist2.charAt(Math.floor(Math.random() * keylist2.length));
        value += keylist.charAt(Math.floor(Math.random() * keylist.length));

        if (/\d/.test(value) == false) return this.generatePassword(secret);

        const encrypted = this.encrypt(value, secret);
        return { value, encrypted, secret };
    };
    
    encrypt(source, password) {
        if (!source) throw new UndefinedError("Source");
        if (!password) throw new UndefinedError("Password");

        let algorithm = "aes-256-ctr";
        let cipher = crypto.createCipher(algorithm, password);
        let crypted = cipher.update(source, "utf8", "hex");
        crypted += cipher.final("hex");
        return crypted;
    };

    decrypt(source, password) {
        if (!source) throw new UndefinedError("Source");
        if (!password) throw new UndefinedError("Password");

        let algorithm = "aes-256-ctr";
        let decipher = crypto.createDecipher(algorithm, password);
        let dec = decipher.update(source,"hex","utf8");
        dec += decipher.final("utf8");
        return dec;
    };

    async randomBytes(length = 12) {
        const bytes = await cryptoRandomBytes(length)
        return bytes.toString('base64');
    };

    async pbkdf2Encrypt(source, iterations = 10000, keylen = 64, digest = "sha1") {
        const salt = await this.randomBytes();
        const bytes = await cryptoPbkdf2(source, salt, iterations, keylen, digest);
        const value = bytes.toString('base64');
        return { value, salt }
    }

};

exports = module.exports = FormService;