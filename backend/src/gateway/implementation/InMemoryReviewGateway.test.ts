import { InMemoryReviewGateway } from "./InMemoryReviewGateway";

describe("Testing review gateway", () => {
    const fs = require('fs');
    let reviewGateway : InMemoryReviewGateway;

    beforeEach(() => {
        reviewGateway = new InMemoryReviewGateway("ReviewsTest");
    });

    test("Reviews retrieval", () => {
        const gatewayResponse = reviewGateway.retrieveAll();
        expect(gatewayResponse).not.toBeUndefined();
        expect(gatewayResponse).toBeInstanceOf(Array);
    })

    test("Review Addition", () => {
        reviewGateway.addReview("test", "test", 1);
        expect(reviewGateway.retrieveAll()).toHaveLength(1);
    })

    afterAll(() => {
        fs.unlinkSync('ReviewsTest.json');
    })
})