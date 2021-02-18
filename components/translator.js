const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
    amToBrit(text) {
        let textArray = text.split(/([!?'. ])/);
        let regexTime = /^\d\d:\d\d$/;
        let amOnly = Object.keys(americanOnly);
        let amToBritSpell = Object.keys(americanToBritishSpelling);
        let amToBritTit = Object.keys(americanToBritishTitles);
        let translatedArray = [];

        for (const i of textArray) {
            let amOnlyFound = amOnly.find((e) => e === i);
            let amSpellFound = amToBritSpell.find((e) => e === i);
            let amTitFound = amToBritTit.find((e) => e === i);
            if (amOnlyFound) {
                let britWord1 = americanOnly[amOnlyFound];
                translatedArray.push(
                    `<span class="highlight">${britWord1}</span>`
                );
            } else if (amSpellFound) {
                let britWord = americanToBritishSpelling[amSpellFound];
                translatedArray.push(
                    `<span class="highlight">${britWord}</span>`
                );
            } else if (amTitFound) {
                let britWord = americanToBritishTitles[amTitFound];
                translatedArray.push(
                    `<span class="highlight">${britWord}</span>`
                );
            } else if (regexTime.test(i)) {
                let britTime = i.replace(":", ".");
                translatedArray.push(
                    `<span class="highlight">${britTime}</span>`
                );
            } else if (i == "Dr.") {
                let britTitle = i.substr(0, i.length - 1);
                translatedArray.push(
                    `<span class="highlight">${britTitle}</span>`
                );
            } else if (i) {
                translatedArray.push(i);
            }
        }
        let translation = translatedArray.join("");
        return {
            text: text,
            translation: translation,
        };
    }

    britToAm(text) {
        return {
            text: text,
            translation: "Everything looks good to me!",
        };
    }
}

module.exports = Translator;
