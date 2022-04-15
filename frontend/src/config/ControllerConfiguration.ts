import { CreateNewLessonController } from "../controller/CreateNewLessonController";
import { CreateNewLexiconUnitController } from "../controller/CreateNewLexiconUnitController";
import { CreateNewPhraseController } from "../controller/CreateNewPhraseController";
import { RetrieveAllLessonsController } from "../controller/RetrieveAllLessonsController";
import { RetrieveAllLexiconUnitsController } from "../controller/RetrieveAllLexiconUnitsController";
import { RetrieveAllPhrasesController } from "../controller/RetrieveAllPhrasesController";
import { RestLessonGateway } from "../gateway/implementation/RestLessonGateway";
import { RestLexiconGateway } from "../gateway/implementation/RestLexiconGateway";
import { RestPhraseGateway } from "../gateway/implementation/RestPhraseGateway";
import { RxJsAjaxClient } from "../gateway/implementation/RxJsAjaxClient";
import { CreateNewLessonInteractor } from "../use_case/implementation/CreateNewLessonInteractor";
import { CreateNewLexiconUnitInteractor } from "../use_case/implementation/CreateNewLexiconUnitInteractor";
import { CreateNewPhraseInteractor } from "../use_case/implementation/CreateNewPhraseInteractor";
import { RetrieveAllLessonsInteractor } from "../use_case/implementation/RetrieveAllLessonsInteractor";
import { RetrieveAllLexiconUnitsInteractor } from "../use_case/implementation/RetrieveAllLexiconUnitsInteractor";
import { RetrieveAllPhrasesInteractor } from "../use_case/implementation/RetrieveAllPhrasesInteractor";

const client = new RxJsAjaxClient("http://localhost:8000");

const lexiconGW = new RestLexiconGateway(client);
const phraseGW = new RestPhraseGateway(client);
const lessonGW = new RestLessonGateway(client);

const lexiconUnitCreationUC = new CreateNewLexiconUnitInteractor(lexiconGW);
const lexiconUnitsRetrievalUC = new RetrieveAllLexiconUnitsInteractor(lexiconGW);
const phraseCreationUC = new CreateNewPhraseInteractor(phraseGW);
const phrasesRetrievalUC = new RetrieveAllPhrasesInteractor(phraseGW);
const lessonsCreationUC = new CreateNewLessonInteractor(lessonGW);
const lessonsRetrievalUC = new RetrieveAllLessonsInteractor(lessonGW);

export const newLexiconUnitCreationController = new CreateNewLexiconUnitController(lexiconUnitCreationUC);
export const newPhraseCreationController = new CreateNewPhraseController(phraseCreationUC);
export const newLessonCreationController = new CreateNewLessonController(lessonsCreationUC);
export const lexiconUnitsRetrievalController = new RetrieveAllLexiconUnitsController(lexiconUnitsRetrievalUC);
export const phrasesRetrievalController = new RetrieveAllPhrasesController(phrasesRetrievalUC);
export const lessonsRetrievalController = new RetrieveAllLessonsController(lessonsRetrievalUC);