import { map, Observable } from "rxjs";
import { AuthorizeAdministratorUseCase } from "../use_case/api/AuthorizeAdministratorUseCase";
import { AdminB2VConverter } from "./AdminB2VConverter";
import { ViewAdminResponse } from "./model/ViewAdminResponse";

export class AuthorizeAdministratorController {
  private readonly uc: AuthorizeAdministratorUseCase;
  private readonly converter: AdminB2VConverter;

  constructor(uc: AuthorizeAdministratorUseCase, converter: AdminB2VConverter) {
    this.uc = uc;
    this.converter = converter;
  }

  authorize(username: string, password: string): Observable<ViewAdminResponse> {
    return this.uc.authorize(username, password)
      .pipe(map((admin) => this.converter.convert(admin)));
  }
}