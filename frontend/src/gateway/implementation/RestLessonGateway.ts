import { Observable } from "rxjs";
import { Lesson } from "../../domain/Lesson";
import { LESSONS_PATH } from "../../RouteConstants";
import { Client } from "../api/Client";
import { LessonGateway } from "../api/LessonGateway";

export class RestLessonGateway implements LessonGateway {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  createNewLesson(lesson: Lesson, token: string | undefined): Observable<void> {
      const body = {
          lesson: lesson,
      }

      const headers = {
        Authorization: 'Bearer ' + token,
      };

    return this.client.post<void>(LESSONS_PATH, body, headers);
  }

  retrieveAllLessons(): Observable<Lesson[]> {
    return this.client.get<Lesson[]>(LESSONS_PATH);
  }
}