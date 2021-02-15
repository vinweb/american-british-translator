const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
    amToBrit(text) {
        let textArray = text.split(" ");
        let regexTime = /^\d\d:\d\d$/;
        let amToBritArray = Object.keys(americanToBritishSpelling);
        let translatedArray = [];
        for (const i of textArray) {
            let found = amToBritArray.find((e) => e === i);
            if (found) {
                let britWord = americanToBritishSpelling[found];
                translatedArray.push(
                    `<span class="highlight">${britWord}</span>`
                );
            } else if (regexTime.test(i)) {
                let britTime = i.replace(":", ".");
                translatedArray.push(
                    `<span class="highlight">${britTime}</span>`
                );
            } else {
                translatedArray.push(i);
            }
        }
        let translation = translatedArray.join(" ");
        return {
            text: text,
            translation: translation,
        };
    }
}

module.exports = Translator;
