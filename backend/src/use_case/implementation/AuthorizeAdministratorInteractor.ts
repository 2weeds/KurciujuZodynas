import { AdminGateway } from "../../gateway/api/AdminGateway";
import { AuthorizeAdministratorUseCase } from "../api/AuthorizeAdministratorUseCase";
import { BoundaryAdmin } from "../api/entity/BoundaryAdmin";

export class AuthorizeAdministratorInteractor implements AuthorizeAdministratorUseCase {
    private readonly adminGW: AdminGateway;

    constructor(adminGW: AdminGateway) {
        this.adminGW = adminGW;
    }

    authorize(username: string, password: string): BoundaryAdmin {
        return new BoundaryAdmin(this.adminGW.checkAdminCredentials(username, password));
    }
}