import { Observable } from "rxjs";
import { BoundaryLesson } from "../model/BoundaryLesson";

export interface RetrieveAllLessonsUseCase {
    retrieve(): Observable<BoundaryLesson[]>;
}