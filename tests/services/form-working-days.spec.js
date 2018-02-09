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

describe("Working days", async () => {

    it("nonWorkingDays", async () => {
        let qwebs = new Qwebs({ dirname: __dirname, config: {} });
        qwebs.inject("$form", "../../index");
        await qwebs.load();
        const workingDays = await qwebs.resolve("$form-working-days");
        expect(workingDays.nonWorkingDays("fr", 2018).length).to.be(117);
    });
});
