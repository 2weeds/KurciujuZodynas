import { Observable } from "rxjs";

export interface Client {
  post<T>(
    url: string,
    body?: any,
    headers?: Record<string, string>
  ): Observable<T>;
}