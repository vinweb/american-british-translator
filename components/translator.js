const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
    amToBrit(text) {
        // Time test
        let regexTime = /\d:\d\d/g;
        if (regexTime.test(text)) {
            let translatedArray = [];
            let textArray = text.split(/([!?'. ])/);
            for (const i of textArray) {
                if (regexTime.test(i)) {
                    let britTime = i.replace(":", ".");
                    translatedArray.push(
                        `<span class="highlight">${britTime}</span>`
                    );
                } else {
                    translatedArray.push(i);
                }
            }
            let translation = translatedArray.join("");
            return {
                text: text,
                translation: translation,
            };
        }

        const dict = {
            ...americanOnly,
            ...americanToBritishSpelling,
            ...americanToBritishTitles,
        };

        // Searching
        let text2 = text;
        for (const [key, value] of Object.entries(dict)) {
            let regex = new RegExp(key + "\\b", "gi");
            let regexTitle = new RegExp(key, "gi");
            let regexDot = /[.]/g;
            if (regexDot.test(key) && regexTitle.test(text2)) {
                let valueTitle = value.charAt(0).toUpperCase() + value.slice(1);
                let foundWord = `<span class="highlight">${valueTitle}</span>`;
                text2 = text.replace(regexTitle, foundWord);
                return {
                    text: text,
                    translation: text2,
                };
            }
            if (regex.test(text2)) {
                let foundWord = `<span class="highlight">${value}</span>`;
                let text2 = text.replace(regex, foundWord);
                return {
                    text: text,
                    translation: text2,
                };
            }
        }
        if (text === text2) {
            return {
                text: text,
                translation: "Everything looks good to me!",
            };
        }
    }

    britToAm(text) {
        // Time test
        let regexTime = /\d.\d\d/g;
        if (regexTime.test(text)) {
            let translatedArray = [];
            let textArray = text.split(/([!?': ])/);
            for (const i of textArray) {
                if (regexTime.test(i)) {
                    let britTime = i.replace(".", ":");
                    if (britTime.includes(".")) {
                        let britTimeNoDot = britTime.slice(0, -1);
                        translatedArray.push(
                            `<span class="highlight">${britTimeNoDot}</span>.`
                        );
                    } else {
                        translatedArray.push(
                            `<span class="highlight">${britTime}</span>`
                        );
                    }
                } else {
                    translatedArray.push(i);
                }
            }
            let translation = translatedArray.join("");
            return {
                text: text,
                translation: translation,
            };
        }
        // Searching
        let text2 = text;
        for (const [key, value] of Object.entries(britishOnly)) {
            let regex = new RegExp(key + "\\b", "gi");
            let regexDuplicateValue = new RegExp(value + "</span>", "gi");

            if (regex.test(text2) && !regexDuplicateValue.test(text2)) {
                let foundWord = `<span class="highlight">${value}</span>`;
                text2 = text2.replace(regex, foundWord);
                continue;
            }
        }
        for (const [key, value] of Object.entries(americanToBritishSpelling)) {
            let regex = new RegExp(value + "\\b", "gi");
            if (regex.test(text)) {
                let foundWord = `<span class="highlight">${key}</span>`;
                return {
                    text: text,
                    translation: text.replace(regex, foundWord),
                };
            }
        }
        for (const [key, value] of Object.entries(americanToBritishTitles)) {
            let regexTitle = new RegExp(value + "\\b", "gi");
            if (regexTitle.test(text)) {
                let title = key.charAt(0).toUpperCase() + key.slice(1);
                let foundWord = `<span class="highlight">${title}</span>`;
                return {
                    text: text,
                    translation: text.replace(regexTitle, foundWord),
                };
            }
        }
        if (text === text2) {
            return {
                text: text,
                translation: "Everything looks good to me!",
            };
        } else {
            return {
                text: text,
                translation: text2,
            };
        }
    }
}
module.exports = Translator;
