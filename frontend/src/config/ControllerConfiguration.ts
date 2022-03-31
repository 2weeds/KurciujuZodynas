import { CreateNewLexiconUnitController } from "../controller/CreateNewLexiconUnitController";
import { CreateNewPhraseController } from "../controller/CreateNewPhraseController";
import { RetrieveAllLexiconUnitsController } from "../controller/RetrieveAllLexiconUnitsController";
import { RetrieveAllPhrasesController } from "../controller/RetrieveAllPhrasesController";
import { RestLexiconGateway } from "../gateway/implementation/RestLexiconGateway";
import { RestPhraseGateway } from "../gateway/implementation/RestPhraseGateway";
import { RxJsAjaxClient } from "../gateway/implementation/RxJsAjaxClient";
import { CreateNewLexiconUnitInteractor } from "../use_case/implementation/CreateNewLexiconUnitInteractor";
import { CreateNewPhraseInteractor } from "../use_case/implementation/CreateNewPhraseInteractor";
import { RetrieveAllLexiconUnitsInteractor } from "../use_case/implementation/RetrieveAllLexiconUnitsInteractor";
import { RetrieveAllPhrasesInteractor } from "../use_case/implementation/RetrieveAllPhrasesInteractor";

const client = new RxJsAjaxClient("http://localhost:8000");

const lexiconGW = new RestLexiconGateway(client);
const phraseGW = new RestPhraseGateway(client);

const lexiconUnitCreationUC = new CreateNewLexiconUnitInteractor(lexiconGW);
const lexiconUnitsRetrievalUC = new RetrieveAllLexiconUnitsInteractor(lexiconGW);
const phraseCreationUC = new CreateNewPhraseInteractor(phraseGW);
const phrasesRetrievalUC = new RetrieveAllPhrasesInteractor(phraseGW);

export const newLexiconUnitCreationController = new CreateNewLexiconUnitController(lexiconUnitCreationUC);
export const newPhraseCreationController = new CreateNewPhraseController(phraseCreationUC);
export const lexiconUnitsRetrievalController = new RetrieveAllLexiconUnitsController(lexiconUnitsRetrievalUC);
export const phrasesRetrievalController = new RetrieveAllPhrasesController(phrasesRetrievalUC);