"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
    const translator = new Translator();

    app.route("/api/translate").post((req, res) => {
        let text = req.body.text;
        let locale = req.body.locale;

        if (Object.keys(req.body).length < 2) {
            return res.json({ error: "Required field(s) missing" });
        } else if (text == "") {
            return res.json({ error: "No text to translate" });
        } else if (locale == "" && text) {
            return res.json({ error: "Missing locale field" });
        } else if (locale == "american-to-british" && text) {
            return res.json(translator.amToBrit(text));
        } else if (locale == "british-to-american" && text) {
            return res.json(translator.britToAm(text));
        } else if (
            locale !== "american-to-british" ||
            locale !== "british-to-american"
        ) {
            return res.json({ error: "Invalid value for locale field" });
        }
    });
};
