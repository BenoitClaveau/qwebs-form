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

describe("format", () => {

    it("post object -> object", async () => {
        let qwebs = new Qwebs({ dirname: __dirname });
        qwebs.inject("$form", "../../index");
        await qwebs.load();
        const format = await qwebs.resolve("$form-format");
        expect(format.phoneNumber("0123456789")).to.be("01 23 45 67 89");
    });
});
