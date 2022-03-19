import express from 'express';
import cors from 'cors';
import { CreateNewLexiconUnitRoute } from './rest/implementation/CreateNewLexiconUnitRoute';
import { CreateNewLexiconUnitInteractor } from './use_case/implementation/CreateNewLexiconUnitInteractor';
import { InMemoryLexiconUnitGateway } from './gateway/implementation/InMemoryLexiconUnitGateway';
import { InMemoryAdminGateway } from './gateway/implementation/InMemoryAdminGateway';
import { AuthorizeAdministratorInteractor } from './use_case/implementation/AuthorizeAdministratorInteractor';
import { AuthorizeAdministratorRoute } from './rest/implementation/AuthorizeAdministratorRoute';
const app = express();

app.listen(8000, () => console.log("Listening to app at 8000"));
app.use(cors());
app.use(express.static('src'));
app.use(express.json());

const lexiconGW = new InMemoryLexiconUnitGateway();
const createLexiconUnitUC = new CreateNewLexiconUnitInteractor(lexiconGW);
const createLexiconUnitRoute = new CreateNewLexiconUnitRoute(createLexiconUnitUC);

const adminGW = new InMemoryAdminGateway();
const authorizeAdministratorUC = new AuthorizeAdministratorInteractor(adminGW);
const authorizeAdministratorRoute = new AuthorizeAdministratorRoute(authorizeAdministratorUC);

app.get('/', (req, resp) => {
    resp.send("Hello world");
})

app.post('/system-management', (req, resp) => {
    authorizeAdministratorRoute.authorize(req, resp);
})