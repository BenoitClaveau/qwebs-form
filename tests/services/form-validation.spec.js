/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const expect = require("expect.js");
const process = require("process");
const Qwebs = require("qwebs");
const { inspect } = require('util');

process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at:", p, "reason:", inspect(reason));
});

describe("Validation", async () => {

    it("phoneNumber", async () => {
        let qwebs = new Qwebs({ dirname: __dirname, config: {} });
        qwebs.inject("$form", "../../index");
        await qwebs.load();
        const validation = await qwebs.resolve("$form-validation");
        expect(validation.phoneNumber("0123456789")).to.be(true);
    });

    it("generatePassword", async () => {
        let qwebs = new Qwebs({ dirname: __dirname, config: {} });
        qwebs.inject("$form", "../../index");
        await qwebs.load();
        const validation = await qwebs.resolve("$form-validation");
        expect(validation.generatePassword()).not.to.be(null);
    });
});
