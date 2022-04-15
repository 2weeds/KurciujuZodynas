import { Observable } from "rxjs";
import { BoundaryLesson } from "../model/BoundaryLesson";

export interface CreateNewLessonUseCase {
    create(lesson: BoundaryLesson, token: string | undefined): Observable<void>;
}