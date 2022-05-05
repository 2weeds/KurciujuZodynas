import { InMemoryLessonGateway } from "./InMemoryLessonGateway";

describe("Testing lesson gateway", () => {
    let lessonGateway : InMemoryLessonGateway;

    beforeEach(() => {
        lessonGateway = new InMemoryLessonGateway();
    });

    test("Lesson retrieval", () => {
        expect(lessonGateway.retrieveAll()).not.toBeUndefined();
    })
})