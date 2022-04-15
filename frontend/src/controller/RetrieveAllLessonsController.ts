import { map, Observable } from "rxjs";
import { RetrieveAllLessonsUseCase } from "../use_case/api/RetrieveAllLessonsUseCase";
import { BoundaryLesson } from "../use_case/model/BoundaryLesson";
import { BoundaryLessonPart } from "../use_case/model/BoundaryLessonPart";
import { ViewLesson } from "./model/ViewLesson";
import { ViewLessonPart } from "./model/ViewLessonPart";

export class RetrieveAllLessonsController {
  private readonly uc: RetrieveAllLessonsUseCase;

  constructor(uc: RetrieveAllLessonsUseCase) {
    this.uc = uc;
  }

  retrieve(): Observable<ViewLesson[]> {
    return this.uc.retrieve().pipe(map((lessonArray) => this.convertB2V(lessonArray)));
  }

  convertB2V(lessonArray: BoundaryLesson[]): ViewLesson[] {
    const viewLessonArray: ViewLesson[] = [];
    lessonArray.forEach(lesson => {
            const convertedParts = lesson.parts.map(part => this.convertPartsToView(part));
            const converted = new ViewLesson(lesson.name, lesson.goal, convertedParts)
            viewLessonArray.push(converted)
        });

        return viewLessonArray;
  }

    private convertPartsToView(lessonPart: BoundaryLessonPart): ViewLessonPart {
        return new ViewLessonPart(lessonPart.name, lessonPart.subTopics);
    }
}