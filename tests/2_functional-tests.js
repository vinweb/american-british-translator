const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
    test("Translation with text and locale fields: POST request to /api/translate", function (done) {
        chai.request(server)
            .post("/api/translate")
            .send({
                text: "Mangoes are my favorite fruit.",
                locale: "american-to-british",
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.text, "Mangoes are my favorite fruit.");
                assert.equal(
                    res.body.translation,
                    `Mangoes are my <span class="highlight">favourite</span> fruit.`
                );
                done();
            });
    });
    test("Translation with text and invalid locale field: POST request to /api/translate", function (done) {
        chai.request(server)
            .post("/api/translate")
            .send({
                text: "Ceci n'est pas une pipe",
                locale: "french-to-american",
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Invalid value for locale field");
                done();
            });
    });
    test("Translation with missing text field: POST request to /api/translate", function (done) {
        chai.request(server)
            .post("/api/translate")
            .send({
                locale: "american-to-british",
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Required field(s) missing");
                done();
            });
    });
    test("Translation with missing locale field: POST request to /api/translate", function (done) {
        chai.request(server)
            .post("/api/translate")
            .send({
                text: "Mangoes are my favorite fruit.",
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Required field(s) missing");
                done();
            });
    });
    test("Translation with empty text: POST request to /api/translate", function (done) {
        chai.request(server)
            .post("/api/translate")
            .send({
                text: "",
                locale: "american-to-british",
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "No text to translate");
                done();
            });
    });
    test("Translation with text that needs no translation: POST request to /api/translate", function (done) {
        chai.request(server)
            .post("/api/translate")
            .send({
                text: "SaintPeter and nhcarrigan give their regards!",
                locale: "british-to-american",
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(
                    res.body.translation,
                    "Everything looks good to me!"
                );
                done();
            });
    });
});
