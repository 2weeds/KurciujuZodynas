import { Observable } from "rxjs";

export interface AdminGateway {
  authorizeAdmin(username: string, password: string): Observable<string>;
}