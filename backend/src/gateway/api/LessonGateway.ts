import { Lesson } from "../../domain/Lesson";

export interface LessonGateway {
    createLesson(name: string, goal: string, topicNames: string[], topicMaterial: []): void;

    retrieveAll(): Lesson[];
}