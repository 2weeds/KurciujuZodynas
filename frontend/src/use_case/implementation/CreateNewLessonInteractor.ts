import { Observable } from "rxjs";
import { Lesson } from "../../domain/Lesson";
import { LessonPart } from "../../domain/LessonPart";
import { LessonGateway } from "../../gateway/api/LessonGateway";
import { CreateNewLessonUseCase } from "../api/CreateNewLessonUseCase";
import { BoundaryLesson } from "../model/BoundaryLesson";
import { BoundaryLessonPart } from "../model/BoundaryLessonPart";

export class CreateNewLessonInteractor implements CreateNewLessonUseCase {
    private readonly lessonGW: LessonGateway;

    constructor(lessonGW: LessonGateway) {
        this.lessonGW = lessonGW;
    }

    create(lesson: BoundaryLesson, token: string | undefined): Observable<void> {
        return this.lessonGW.createNewLesson(this.convertToDomain(lesson), token);
    }

    private convertToDomain(lesson: BoundaryLesson): Lesson {
        const convertedLessonParts: LessonPart[] = lesson.parts.map(part => this.convertLessonPartsToDomain(part))
        return new Lesson(lesson.name, lesson.goal, convertedLessonParts);
    }
    
    private convertLessonPartsToDomain(part: BoundaryLessonPart): LessonPart {
        return new LessonPart(part.name, Object.fromEntries(part.subTopics));
    }
}