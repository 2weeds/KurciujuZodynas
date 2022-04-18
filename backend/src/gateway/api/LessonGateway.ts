import { Lesson } from "../../domain/Lesson";

export interface LessonGateway {
    createLesson(lesson: Lesson): void;

    retrieveAll(): Lesson[];
}