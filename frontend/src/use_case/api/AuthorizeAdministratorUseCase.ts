import { Observable } from "rxjs";
import { BoundaryAdmin } from "../model/BoundaryAdmin";

export interface AuthorizeAdministratorUseCase {
    authorize(username: string, password: string): Observable<BoundaryAdmin>
}