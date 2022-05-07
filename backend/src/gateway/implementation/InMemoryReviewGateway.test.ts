import { InMemoryReviewGateway } from "./InMemoryReviewGateway";

describe("Testing review gateway", () => {
    let reviewGateway : InMemoryReviewGateway;

    beforeEach(() => {
        reviewGateway = new InMemoryReviewGateway();
    });

    test("Reviews retrieval", () => {
        const gatewayResponse = reviewGateway.retrieveAll();
        expect(gatewayResponse).not.toBeUndefined();
        expect(gatewayResponse).toBeInstanceOf(Array);
    })
})