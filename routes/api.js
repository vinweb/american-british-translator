"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
    const translator = new Translator();

    app.route("/api/translate").post((req, res) => {
        let text = req.body.text;
        let locale = req.body.locale;
        if (locale == "american-to-british") {
            let translationText = text.replace(":", ".");
            let translation = `<span class="highlight">${translationText}</span>`;
            return res.json({
                text: text,
                translation: translation,
            });
        }
        if (locale == "british-to-american") {
            let translationText = text.replace(".", ":");
            let translation = `<span class="highlight">${translationText}</span>`;
            return res.json({
                text: text,
                translation: translation,
            });
        }
    });
};
