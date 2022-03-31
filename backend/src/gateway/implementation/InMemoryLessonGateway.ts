import { Lesson } from "../../domain/Lesson";
import { LessonGateway } from "../api/LessonGateway";

export class InMemoryLessonGateway implements LessonGateway {

    createLesson(name: string, goal: string, topicNames: string[], topicMaterial: []): void {
        throw new Error("Method not implemented.");
    }

    retrieveAll(): Lesson[] {
        throw new Error("Method not implemented.");
    }
    
}