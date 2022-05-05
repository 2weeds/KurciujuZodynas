import { InMemoryLexiconUnitGateway } from "./InMemoryLexiconUnitGateway";

describe("Testing lexicon gateway", () => {
    let lexiconGateway : InMemoryLexiconUnitGateway;

    beforeEach(() => {
        lexiconGateway = new InMemoryLexiconUnitGateway();
    });

    test("Lexicon units retrieval", () => {
        expect(lexiconGateway.retrieveAll()).not.toBeUndefined();
    })
})