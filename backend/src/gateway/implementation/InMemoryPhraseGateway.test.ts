import { InMemoryPhraseGateway } from "./InMemoryPhraseGateway";

describe("Testing phrase gateway", () => {
    const fs = require('fs');
    let phraseGateway : InMemoryPhraseGateway;

    beforeEach(() => {
        phraseGateway = new InMemoryPhraseGateway("PhrasesTest");
    });

    test("Phrases retrieval", () => {
        const gatewayResponse = phraseGateway.retrieveAll();
        expect(gatewayResponse).not.toBeUndefined();
        expect(gatewayResponse).toBeInstanceOf(Array);
    })

    test("Phrase Addition", () => {
        phraseGateway.createPhrase("test", null);
        expect(phraseGateway.retrieveAll()).toHaveLength(1);
    })

    afterAll(() => {
        fs.unlinkSync('PhrasesTest.json');
    })
})