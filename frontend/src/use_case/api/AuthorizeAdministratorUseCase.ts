import { Observable } from "rxjs";

export interface AuthorizeAdministratorUseCase {
    authorize(username: string, password: string): Observable<string>
}