import { AdminB2VConverter } from "./controller/AdminB2VConverter";
import { AuthorizeAdministratorController } from "./controller/AuthorizeAdministratorController";
import { CreateNewLexiconUnitController } from "./controller/CreateNewLexiconUnitController";
import { RestAdminGateway } from "./gateway/implementation/RestAdminGateway";
import { RestLexiconGateway } from "./gateway/implementation/RestLexiconGateway";
import { RxJsAjaxClient } from "./gateway/implementation/RxJsAjaxClient";
import { AdminD2BConverter } from "./use_case/implementation/AdminD2BConverter";
import { AuthorizeAdministratorInteractor } from "./use_case/implementation/AuthorizeAdministratorInteractor";
import { CreateNewLexiconUnitInteractor } from "./use_case/implementation/CreateNewLexiconUnitInteractor";

const client = new RxJsAjaxClient("http://localhost:8000");

const restAdminGW = new RestAdminGateway(client);
const lexiconGW = new RestLexiconGateway(client);

const adminD2BConverter = new AdminD2BConverter();
const adminB2VConverter = new AdminB2VConverter();

const adminAuthorizationUC = new AuthorizeAdministratorInteractor(restAdminGW, adminD2BConverter);
const lexiconUnitCreationUC = new CreateNewLexiconUnitInteractor(lexiconGW);

export const adminAuthorizationController = new AuthorizeAdministratorController(adminAuthorizationUC, adminB2VConverter);
export const newLexiconUnitCreationController = new CreateNewLexiconUnitController(lexiconUnitCreationUC);