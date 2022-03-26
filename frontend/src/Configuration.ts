import { AdminB2VConverter } from "./controller/AdminB2VConverter";
import { AuthorizeAdministratorController } from "./controller/AuthorizeAdministratorController";
import { CreateNewLexiconUnitController } from "./controller/CreateNewLexiconUnitController";
import { CreateNewPhraseController } from "./controller/CreateNewPhraseController";
import { RestAdminGateway } from "./gateway/implementation/RestAdminGateway";
import { RestLexiconGateway } from "./gateway/implementation/RestLexiconGateway";
import { RestPhraseGateway } from "./gateway/implementation/RestPhraseGateway";
import { RxJsAjaxClient } from "./gateway/implementation/RxJsAjaxClient";
import { AdminD2BConverter } from "./use_case/implementation/AdminD2BConverter";
import { AuthorizeAdministratorInteractor } from "./use_case/implementation/AuthorizeAdministratorInteractor";
import { CreateNewLexiconUnitInteractor } from "./use_case/implementation/CreateNewLexiconUnitInteractor";
import { CreateNewPhraseInteractor } from "./use_case/implementation/CreateNewPhraseInteractor";

const client = new RxJsAjaxClient("http://localhost:8000");

const restAdminGW = new RestAdminGateway(client);
const lexiconGW = new RestLexiconGateway(client);
const phraseGW = new RestPhraseGateway(client);

const adminD2BConverter = new AdminD2BConverter();
const adminB2VConverter = new AdminB2VConverter();

const adminAuthorizationUC = new AuthorizeAdministratorInteractor(restAdminGW, adminD2BConverter);
const lexiconUnitCreationUC = new CreateNewLexiconUnitInteractor(lexiconGW);
const phraseCreationUC = new CreateNewPhraseInteractor(phraseGW);

export const adminAuthorizationController = new AuthorizeAdministratorController(adminAuthorizationUC, adminB2VConverter);
export const newLexiconUnitCreationController = new CreateNewLexiconUnitController(lexiconUnitCreationUC);
export const newPhraseCreationController = new CreateNewPhraseController(phraseCreationUC);