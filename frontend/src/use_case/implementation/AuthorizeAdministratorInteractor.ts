import { map, Observable } from "rxjs";
import { AdminGateway } from "../../gateway/api/AdminGateway";
import { AuthorizeAdministratorUseCase } from "../api/AuthorizeAdministratorUseCase";
import { BoundaryAdmin } from "../model/BoundaryAdmin";
import { AdminD2BConverter } from "./AdminD2BConverter";

export class AuthorizeAdministratorInteractor implements AuthorizeAdministratorUseCase {
    private readonly adminGW: AdminGateway;
    private readonly converter: AdminD2BConverter

    constructor(adminGW: AdminGateway, converter: AdminD2BConverter) {
        this.adminGW = adminGW;
        this.converter = converter;
    }

    authorize(username: string, password: string): Observable<BoundaryAdmin> {
        return this.adminGW.authorizeAdmin(username, password)
        .pipe(map((admin) => this.converter.convert(admin)));
  }
}