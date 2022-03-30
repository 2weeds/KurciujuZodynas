import express from 'express';
import cors from 'cors';
import { CreateNewLexiconUnitRoute } from './rest/implementation/CreateNewLexiconUnitRoute';
import { CreateNewLexiconUnitInteractor } from './use_case/implementation/CreateNewLexiconUnitInteractor';
import { InMemoryLexiconUnitGateway } from './gateway/implementation/InMemoryLexiconUnitGateway';
import { InMemoryAdminGateway } from './gateway/implementation/InMemoryAdminGateway';
import { AuthorizeAdministratorInteractor } from './use_case/implementation/AuthorizeAdministratorInteractor';
import { AuthorizeAdministratorRoute } from './rest/implementation/AuthorizeAdministratorRoute';
import { InMemoryPhraseGateway } from './gateway/implementation/InMemoryPhraseGateway';
import { CreateNewPhraseRoute } from './rest/implementation/CreateNewPhraseRoute';
import { CreateNewPhraseInteractor } from './use_case/implementation/CreateNewPhraseInteractor';
import { RetrieveAllLexiconUnitsRoute } from './rest/implementation/RetrieveAllLexiconUnitsRoute';
import { RetrieveAllLexiconUnitsInteractor } from './use_case/implementation/RetrieveAllLexiconUnitsInteractor';
import { RetrieveAllPhrasesInteractor } from './use_case/implementation/RetrieveAllPhrasesInteractor';
import { RetrieveAllPhrasesRoute } from './rest/implementation/RetrieveAllPhrasesRoute';
const app = express();

app.listen(8000, () => console.log("Listening to app at 8000"));
app.use(cors());
app.use(express.static('src'));
app.use(express.json());

const lexiconGW = new InMemoryLexiconUnitGateway();
const createLexiconUnitUC = new CreateNewLexiconUnitInteractor(lexiconGW);
const createLexiconUnitRoute = new CreateNewLexiconUnitRoute(createLexiconUnitUC);
const retrieveAllLexiconUnitsInteractor = new RetrieveAllLexiconUnitsInteractor(lexiconGW);
const retrieveAllLexiconUnitsRoute = new RetrieveAllLexiconUnitsRoute(retrieveAllLexiconUnitsInteractor);

const adminGW = new InMemoryAdminGateway();
const authorizeAdministratorUC = new AuthorizeAdministratorInteractor(adminGW);
const authorizeAdministratorRoute = new AuthorizeAdministratorRoute(authorizeAdministratorUC);

const phraseGW = new InMemoryPhraseGateway();
const createPhraseUC = new CreateNewPhraseInteractor(phraseGW);
const createPhraseRoute = new CreateNewPhraseRoute(createPhraseUC);
const retrieveAllPhrasesInteractor = new RetrieveAllPhrasesInteractor(phraseGW);
const retrieveAllPhrasesRoute = new RetrieveAllPhrasesRoute(retrieveAllPhrasesInteractor);

app.post('/system-management', (req, resp) => {
    authorizeAdministratorRoute.authorize(req, resp);
})

app.post('/lexicon-units', (req, resp) => {
    createLexiconUnitRoute.create(req, resp);
})

app.get('/lexicon-units', (req, resp) => {
    retrieveAllLexiconUnitsRoute.retrieve(req, resp);
})

app.post('/phrases', (req, resp) => {
    createPhraseRoute.create(req, resp);
})

app.get('/phrases', (req, resp) => {
    retrieveAllPhrasesRoute.retrieve(req, resp);
})