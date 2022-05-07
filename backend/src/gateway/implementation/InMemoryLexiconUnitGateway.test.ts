import { InMemoryLexiconUnitGateway } from "./InMemoryLexiconUnitGateway";

describe("Testing lexicon gateway", () => {
    let lexiconGateway : InMemoryLexiconUnitGateway;

    beforeEach(() => {
        lexiconGateway = new InMemoryLexiconUnitGateway();
    });

    test("Lexicon units retrieval", () => {
        const gatewayResponse = lexiconGateway.retrieveAll();
        expect(gatewayResponse).not.toBeUndefined();
        expect(gatewayResponse).toBeInstanceOf(Array);
    })
})