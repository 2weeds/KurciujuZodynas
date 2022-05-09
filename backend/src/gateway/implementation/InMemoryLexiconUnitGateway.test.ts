import { InMemoryLexiconUnitGateway } from "./InMemoryLexiconUnitGateway";

describe("Testing lexicon gateway", () => {
    const fs = require('fs');
    let lexiconGateway : InMemoryLexiconUnitGateway;

    beforeEach(() => {
        lexiconGateway = new InMemoryLexiconUnitGateway("LexiconUnitsTest");
    });

    test("Lexicon units retrieval", () => {
        const gatewayResponse = lexiconGateway.retrieveAll();
        expect(gatewayResponse).not.toBeUndefined();
        expect(gatewayResponse).toBeInstanceOf(Array);
    })

    test("Lexicon unit Addition", () => {
        lexiconGateway.createUnit("test", "test", null);
        expect(lexiconGateway.retrieveAll()).toHaveLength(1);
    })

    afterAll(() => {
        fs.unlinkSync('LexiconUnitsTest.json');
    })
})