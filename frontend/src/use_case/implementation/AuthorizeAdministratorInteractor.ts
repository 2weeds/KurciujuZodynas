import { Observable } from "rxjs";
import { AdminGateway } from "../../gateway/api/AdminGateway";
import { AuthorizeAdministratorUseCase } from "../api/AuthorizeAdministratorUseCase";

export class AuthorizeAdministratorInteractor implements AuthorizeAdministratorUseCase {
    private readonly adminGW: AdminGateway;

    constructor(adminGW: AdminGateway) {
        this.adminGW = adminGW;
    }

    authorize(username: string, password: string): Observable<string> {
        return this.adminGW.authorizeAdmin(username, password);
  }
}