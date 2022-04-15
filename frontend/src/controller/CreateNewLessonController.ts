import { Observable } from "rxjs";
import { CreateNewLessonUseCase } from "../use_case/api/CreateNewLessonUseCase";
import { BoundaryLesson } from "../use_case/model/BoundaryLesson";
import { BoundaryLessonPart } from "../use_case/model/BoundaryLessonPart";
import { ViewLesson } from "./model/ViewLesson";
import { ViewLessonPart } from "./model/ViewLessonPart";

export class CreateNewLessonController {
  private readonly uc: CreateNewLessonUseCase;

  constructor(uc: CreateNewLessonUseCase) {
    this.uc = uc;
  }

  create(lesson: ViewLesson,  token: string | undefined): Observable<void> {
    return this.uc.create(this.convertToBoundary(lesson), token);
  }

  private convertToBoundary(lesson: ViewLesson): BoundaryLesson {
      const convertedLessonParts: BoundaryLessonPart[] = lesson.parts.map(part => this.convertLessonPartsToBoundary(part))
      return new BoundaryLesson(lesson.name, lesson.goal, convertedLessonParts)
  }
  
  private convertLessonPartsToBoundary(part: ViewLessonPart): BoundaryLessonPart {
      return new BoundaryLessonPart(part.name, part.subTopics);
  }
}