import { Lesson } from "../../domain/Lesson";
import { InMemoryLessonGateway } from "./InMemoryLessonGateway";

describe("Testing lesson gateway", () => {
    const fs = require('fs');
    let lessonGateway : InMemoryLessonGateway;

    beforeEach(() => {
        lessonGateway = new InMemoryLessonGateway("LessonsTest");
    });

    test("Lesson retrieval", () => {
        const gatewayResponse = lessonGateway.retrieveAll();
        expect(gatewayResponse).not.toBeUndefined();
        expect(gatewayResponse).toBeInstanceOf(Array);
    })

    test("Lesson Addition", () => {
        lessonGateway.createLesson(new Lesson("test", "test", []));
        expect(lessonGateway.retrieveAll()).toHaveLength(1);
    })

    afterAll(() => {
        fs.unlinkSync('LessonsTest.json');
    })
})