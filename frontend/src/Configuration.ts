import { AuthorizeAdministratorController } from "./controller/AuthorizeAdministratorController";
import { CreateNewLexiconUnitController } from "./controller/CreateNewLexiconUnitController";
import { CreateNewPhraseController } from "./controller/CreateNewPhraseController";
import { RetrieveAllLexiconUnitsController } from "./controller/RetrieveAllLexiconUnitsController";
import { RestAdminGateway } from "./gateway/implementation/RestAdminGateway";
import { RestLexiconGateway } from "./gateway/implementation/RestLexiconGateway";
import { RestPhraseGateway } from "./gateway/implementation/RestPhraseGateway";
import { RxJsAjaxClient } from "./gateway/implementation/RxJsAjaxClient";
import { AuthorizeAdministratorInteractor } from "./use_case/implementation/AuthorizeAdministratorInteractor";
import { CreateNewLexiconUnitInteractor } from "./use_case/implementation/CreateNewLexiconUnitInteractor";
import { CreateNewPhraseInteractor } from "./use_case/implementation/CreateNewPhraseInteractor";
import { RetrieveAllLexiconUnitsInteractor } from "./use_case/implementation/RetrieveAllLexiconUnitsInteractor";

const client = new RxJsAjaxClient("http://localhost:8000");

const restAdminGW = new RestAdminGateway(client);
const lexiconGW = new RestLexiconGateway(client);
const phraseGW = new RestPhraseGateway(client);

const adminAuthorizationUC = new AuthorizeAdministratorInteractor(restAdminGW);
const lexiconUnitCreationUC = new CreateNewLexiconUnitInteractor(lexiconGW);
const lexiconUnitsRetrievalUC = new RetrieveAllLexiconUnitsInteractor(lexiconGW);
const phraseCreationUC = new CreateNewPhraseInteractor(phraseGW);

export const adminAuthorizationController = new AuthorizeAdministratorController(adminAuthorizationUC);
export const newLexiconUnitCreationController = new CreateNewLexiconUnitController(lexiconUnitCreationUC);
export const newPhraseCreationController = new CreateNewPhraseController(phraseCreationUC);
export const lexiconUnitsRetrievalController = new RetrieveAllLexiconUnitsController(lexiconUnitsRetrievalUC);