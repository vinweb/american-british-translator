const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const translator = new Translator();

suite("Unit Tests", () => {
    test("Translate Mangoes are my favorite fruit. to British English", () => {
        assert.equal(
            translator.amToBrit("Mangoes are my favorite fruit.").translation,
            'Mangoes are my <span class="highlight">favourite</span> fruit.'
        );
    });
    test("Translate I ate yogurt for breakfast. to British English", () => {
        assert.equal(
            translator.amToBrit("I ate yogurt for breakfast.").translation,
            'I ate <span class="highlight">yoghurt</span> for breakfast.'
        );
    });
    test("Translate We had a party at my friend's condo. to British English", () => {
        assert.equal(
            translator.amToBrit("We had a party at my friend's condo.")
                .translation,
            `We had a party at my friend's <span class="highlight">flat</span>.`
        );
    });
});
