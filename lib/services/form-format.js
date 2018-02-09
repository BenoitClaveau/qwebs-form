/*!
 * qwebs
 * Copyright(c) 2018 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */ 
const { Error, UndefinedError } = require("oups");

class FormaValidationService {
    constructor() {
    };
    
    trim(source) {
        if (!source) return "";
        return source.replace(/\s/g,"");
    };

    phoneNumber(phoneNumber) {
        if (!phoneNumber) return null;
        let temp = this.trim(phoneNumber).replace(/(0033\d|\+33\d|\d{2})(\d{2})(?!$)/g,"$1 $2 ");
        if (temp.indexOf("0033") == 0) temp = "+33" + temp.substr(4, temp.length - 4);
        if (temp.indexOf("+33") == 0) temp = "+33 " + temp.substr(3, temp.length - 3);
        return temp;
    };
};

exports = module.exports = FormaValidationService;