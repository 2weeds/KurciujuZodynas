import { map, Observable } from "rxjs";
import { Lesson } from "../../domain/Lesson";
import { LessonPart } from "../../domain/LessonPart";
import { LessonGateway } from "../../gateway/api/LessonGateway";
import { RetrieveAllLessonsUseCase } from "../api/RetrieveAllLessonsUseCase";
import { BoundaryLesson } from "../model/BoundaryLesson";
import { BoundaryLessonPart } from "../model/BoundaryLessonPart";

export class RetrieveAllLessonsInteractor implements RetrieveAllLessonsUseCase {
    private readonly lessonGW: LessonGateway;

    constructor(lessonGW: LessonGateway){
        this.lessonGW = lessonGW;
    }

    retrieve(): Observable<BoundaryLesson[]> {
        return this.lessonGW
            .retrieveAllLessons()
            .pipe(map((lessonArray) => this.convertD2B(lessonArray)));
    }

    private convertD2B(lessonArray: Lesson[]): BoundaryLesson[] {
        const boundarylessonArray: BoundaryLesson[] = [];
        lessonArray.forEach(lesson => {
            const convertedParts = lesson.parts.map(part => this.convertPartsToBoundary(part));
            const converted = new BoundaryLesson(lesson.name, lesson.goal, convertedParts)
            boundarylessonArray.push(converted);
        });

        return boundarylessonArray;
    }

    private convertPartsToBoundary(lessonPart: LessonPart): BoundaryLessonPart {
        return new BoundaryLessonPart(lessonPart.name, new Map(Object.entries(lessonPart.subTopics)));
    }
}