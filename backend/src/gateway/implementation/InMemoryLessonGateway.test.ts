import { InMemoryLessonGateway } from "./InMemoryLessonGateway";

describe("Testing lesson gateway", () => {
    let lessonGateway : InMemoryLessonGateway;

    beforeEach(() => {
        lessonGateway = new InMemoryLessonGateway();
    });

    test("Lesson retrieval", () => {
        const gatewayResponse = lessonGateway.retrieveAll();
        expect(gatewayResponse).not.toBeUndefined();
        expect(gatewayResponse).toBeInstanceOf(Array);
    })
})