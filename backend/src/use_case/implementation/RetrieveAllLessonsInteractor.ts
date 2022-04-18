import { Lesson } from "../../domain/Lesson";
import { LessonPart } from "../../domain/LessonPart";
import { LessonGateway } from "../../gateway/api/LessonGateway";
import { BoundaryLesson } from "../api/entity/BoundaryLesson";
import { BoundaryLessonPart } from "../api/entity/BoundaryLessonPart";
import { RetrieveAllLessonsUseCase } from "../api/RetrieveAllLessonsUseCase";

export class RetrieveAllLessonsInteractor implements RetrieveAllLessonsUseCase {
    private readonly lessonGW: LessonGateway;

    constructor(lessonGW: LessonGateway) {
        this.lessonGW = lessonGW;
    }
    
    retrieve(): BoundaryLesson[] {
        return this.lessonGW.retrieveAll().map(element => this.convertD2BLesson(element));
    }

    private convertD2BLesson(lesson: Lesson): BoundaryLesson {
        const convertedLessonParts = lesson.getParts().map(part => this.convertLessonPartToBoundary(part))
        const convertedLesson = new BoundaryLesson(lesson.getName(), lesson.getGoal(), convertedLessonParts)
        return convertedLesson;
    }

    private convertLessonPartToBoundary(part: LessonPart): BoundaryLessonPart {
        const newPart = new BoundaryLessonPart(part.name, new Map(Object.entries(part.subTopics)))
        return newPart;
    }
}