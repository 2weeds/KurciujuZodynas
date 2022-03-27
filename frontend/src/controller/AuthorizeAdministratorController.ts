import { Observable } from "rxjs";
import { AuthorizeAdministratorUseCase } from "../use_case/api/AuthorizeAdministratorUseCase";

export class AuthorizeAdministratorController {
  private readonly uc: AuthorizeAdministratorUseCase;

  constructor(uc: AuthorizeAdministratorUseCase) {
    this.uc = uc;
  }

  authorize(username: string, password: string): Observable<string> {
    return this.uc.authorize(username, password);
  }
}