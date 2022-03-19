import { AdminB2VConverter } from "./controller/AdminB2VConverter";
import { AuthorizeAdministratorController } from "./controller/AuthorizeAdministratorController";
import { RestAdminGateway } from "./gateway/implementation/RestAdminGateway";
import { RxJsAjaxClient } from "./gateway/implementation/RxJsAjaxClient";
import { AdminD2BConverter } from "./use_case/implementation/AdminD2BConverter";
import { AuthorizeAdministratorInteractor } from "./use_case/implementation/AuthorizeAdministratorInteractor";

const client = new RxJsAjaxClient("http://localhost:8000");
const restAdminGW = new RestAdminGateway(client);
const adminD2BConverter = new AdminD2BConverter();
const AdminAuthorizationUC = new AuthorizeAdministratorInteractor(restAdminGW, adminD2BConverter);
const adminB2VConverter = new AdminB2VConverter();
export const adminAuthorizationController = new AuthorizeAdministratorController(AdminAuthorizationUC, adminB2VConverter);