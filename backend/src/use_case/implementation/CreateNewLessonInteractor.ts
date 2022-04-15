import { Lesson } from "../../domain/Lesson";
import { LessonPart } from "../../domain/LessonPart";
import { LessonGateway } from "../../gateway/api/LessonGateway";
import { CreateNewLessonUseCase } from "../api/CreateNewLessonUseCase";
import { BoundaryLesson } from "../api/entity/BoundaryLesson";
import { BoundaryLessonPart } from "../api/entity/BoundaryLessonPart";

export class CreateNewLessonInteractor implements CreateNewLessonUseCase {
    private readonly gateway: LessonGateway;

    constructor(gateway: LessonGateway) {
        this.gateway = gateway;
    }

    create(lesson: BoundaryLesson): void {
        this.gateway.createLesson(this.convertToDomain(lesson));
    }

    private convertToDomain(lesson: BoundaryLesson): Lesson {
        const convertedParts: LessonPart[] = lesson.getParts().map(part => (this.convertPartToDomain(part)))
        return new Lesson(lesson.getName(), lesson.getGoal(), convertedParts);
    }

    private convertPartToDomain(part: BoundaryLessonPart): LessonPart {
        return new LessonPart(part.getPartName(), Object.fromEntries(part.getPartSubtopics()))
    }
}