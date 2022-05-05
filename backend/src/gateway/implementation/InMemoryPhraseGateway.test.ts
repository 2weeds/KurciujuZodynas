import { InMemoryPhraseGateway } from "./InMemoryPhraseGateway";

describe("Testing phrase gateway", () => {
    let phraseGateway : InMemoryPhraseGateway;

    beforeEach(() => {
        phraseGateway = new InMemoryPhraseGateway();
    });

    test("Phrases retrieval", () => {
        expect(phraseGateway.retrieveAll()).not.toBeUndefined();
    })
})