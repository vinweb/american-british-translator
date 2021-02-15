"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
    const translator = new Translator();

    app.route("/api/translate").post((req, res) => {
        let text = req.body.text;
        let locale = req.body.locale;

        //let regex = /[\d]{2}[.:][\d]{2}/;
        if (Object.keys(req.body).length < 2) {
            return res.json({ error: "Required field(s) missing" });
        }
        if (text == "") {
            return res.json({ error: "No text to translate" });
        }
        if (locale == "american-to-british" && text) {
            /* let translationText = text.replace(":", ".");
            let translation = `<span class="highlight">${translationText}</span>`;
            return res.json({
                text: text,
                translation: translation,
            }); */
            return res.json(translator.amToBrit(text));
        }
        if (locale == "british-to-american" && text) {
            let translationText = text.replace(".", ":");
            let translation = `<span class="highlight">${translationText}</span>`;
            return res.json({
                text: text,
                translation: translation,
            });
        }
    });
};
