/*!
 * qwebs-form
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
 
"use strict";

const { Error, UndefinedError } = require("oups");

class FormService {
    constructor($injector, $config) {
		if (!$config) throw new UndefinedError(`Qwebs config`);
		this.injector = $injector;
		
		this.injector.inject("$form-validation", `${__dirname}/services/form-validation`);
		this.injector.inject("$form-format", `${__dirname}/services/form-format`);
		this.injector.inject("$form-working-days", `${__dirname}/services/form-working-days`);
	};

	async mount() {
		this.formValidation = await this.injector.resolve("$form-validation");
		this.crypto = await this.injector.resolve("$crypto");
	}

	encrypt(clear = this.formValidation.generatePassword(), salt = this.crypto.iv) {
        const password = this.crypto.pbkdf2(clear, salt);
        return {
            password,
            salt,
            clear
        }
    }
};

exports = module.exports = FormService;