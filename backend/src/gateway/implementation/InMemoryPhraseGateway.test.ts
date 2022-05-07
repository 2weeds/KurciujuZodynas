import { InMemoryPhraseGateway } from "./InMemoryPhraseGateway";

describe("Testing phrase gateway", () => {
    let phraseGateway : InMemoryPhraseGateway;

    beforeEach(() => {
        phraseGateway = new InMemoryPhraseGateway();
    });

    test("Phrases retrieval", () => {
        const gatewayResponse = phraseGateway.retrieveAll();
        expect(gatewayResponse).not.toBeUndefined();
        expect(gatewayResponse).toBeInstanceOf(Array);
    })
})