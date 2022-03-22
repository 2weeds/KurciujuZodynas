import { map, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { Client } from "../api/Client";

export class RxJsAjaxClient implements Client {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  post<T>(
    url: string,
    body?: any,
    headers?: Record<string, string>
  ): Observable<T> {
    return ajax
      .post<T>(this.url + url, body, headers)
      .pipe(map((t) => t.response));
  }
}