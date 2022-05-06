import { Observable } from "rxjs";
import { Lesson } from "../../domain/Lesson";

export interface LessonGateway {
  createNewLesson(lesson: Lesson, token: string | undefined): Observable<void>;
  retrieveAllLessons(): Observable<Lesson[]>;
}