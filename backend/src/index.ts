import express from 'express';
import { CreateNewLexiconUnitRoute } from './rest/implementation/CreateNewLexiconUnitRoute';
import { CreateNewLexiconUnitInteractor } from './use_case/implementation/CreateNewLexiconUnitInteractor';
import { InMemoryLexiconUnitGateway } from './gateway/implementation/InMemoryLexiconUnitGateway';
import { InMemoryPhraseGateway } from './gateway/implementation/InMemoryPhraseGateway';
import { CreateNewPhraseRoute } from './rest/implementation/CreateNewPhraseRoute';
import { CreateNewPhraseInteractor } from './use_case/implementation/CreateNewPhraseInteractor';
import { RetrieveAllLexiconUnitsRoute } from './rest/implementation/RetrieveAllLexiconUnitsRoute';
import { RetrieveAllLexiconUnitsInteractor } from './use_case/implementation/RetrieveAllLexiconUnitsInteractor';
import { RetrieveAllPhrasesInteractor } from './use_case/implementation/RetrieveAllPhrasesInteractor';
import { RetrieveAllPhrasesRoute } from './rest/implementation/RetrieveAllPhrasesRoute';
import { InMemoryLessonGateway } from './gateway/implementation/InMemoryLessonGateway';
import { CreateNewLessonInteractor } from './use_case/implementation/CreateNewLessonInteractor';
import { CreateNewLessonRoute } from './rest/implementation/CreateNewLessonRoute';
import { RetrieveAllLessonsInteractor } from './use_case/implementation/RetrieveAllLessonsInteractor';
import { RetrieveAllLessonsRoute } from './rest/implementation/RetrieveAllLessonsRoute';
import { SendLexiconUnitsToExportInteractor } from './use_case/implementation/SendLexiconUnitsToExportInteractor';
import { SendLexiconUnitsToExportRoute } from './rest/implementation/SendLexiconUnitsToExportRoute';
import { SendPhrasesToExportInteractor } from './use_case/implementation/SendPhrasesToExportInteractor';
import { SendPhrasesToExportRoute } from './rest/implementation/SendPhrasesToExportRoute';


const cors = require('cors')({origin: true});
const app = express();

const server = app.listen(8000, () => console.log("Listening to app at 8000"));
app.use(cors);
app.use(express.static('src'));
app.use(express.json());


const lexiconGW = new InMemoryLexiconUnitGateway();
const createLexiconUnitUC = new CreateNewLexiconUnitInteractor(lexiconGW);
const createLexiconUnitRoute = new CreateNewLexiconUnitRoute(createLexiconUnitUC);
const retrieveAllLexiconUnitsInteractor = new RetrieveAllLexiconUnitsInteractor(lexiconGW);
const retrieveAllLexiconUnitsRoute = new RetrieveAllLexiconUnitsRoute(retrieveAllLexiconUnitsInteractor);
const sendLexiconUnitsToExportInteractor = new SendLexiconUnitsToExportInteractor(lexiconGW);
const sendLexiconUnitsToExportRoute = new SendLexiconUnitsToExportRoute(sendLexiconUnitsToExportInteractor);

const phraseGW = new InMemoryPhraseGateway();
const createPhraseUC = new CreateNewPhraseInteractor(phraseGW);
const createPhraseRoute = new CreateNewPhraseRoute(createPhraseUC);
const retrieveAllPhrasesInteractor = new RetrieveAllPhrasesInteractor(phraseGW);
const retrieveAllPhrasesRoute = new RetrieveAllPhrasesRoute(retrieveAllPhrasesInteractor);
const sendPhrasesToExportInteractor = new SendPhrasesToExportInteractor(phraseGW);
const sendPhrasesToExportRoute = new SendPhrasesToExportRoute(sendPhrasesToExportInteractor);

const lessonGW = new InMemoryLessonGateway();
const createLessonUC = new CreateNewLessonInteractor(lessonGW);
const createLessonRoute = new CreateNewLessonRoute(createLessonUC);
const retrieveAllLessonsUC = new RetrieveAllLessonsInteractor(lessonGW);
const retrieveAllLessonsRoute = new RetrieveAllLessonsRoute(retrieveAllLessonsUC);

app.post('/lexicon-units', (req, resp) => {
    createLexiconUnitRoute.create(req as RequestWithFile, resp);
})
app.post('/get-lexicon-units-to-export', (req,resp) => {
    sendLexiconUnitsToExportRoute.send(req, resp);
})
app.post('/get-phrases-to-export', (req,resp)=>{
    sendPhrasesToExportRoute.send(req,resp);
})
app.get('/zipDownload',(req,resp)=>{
    try{
        resp.download('../backend/src/fileStorage/Scorm/ZipToExport.txt');
    }
    catch(err){
        console.log(err);
    }
})

app.get('/lexicon-units', (req, resp) => {
    retrieveAllLexiconUnitsRoute.retrieve(req, resp);
})

app.post('/phrases', (req, resp) => {
    createPhraseRoute.create(req as RequestWithFile, resp);
})

app.get('/phrases', (req, resp) => {
    retrieveAllPhrasesRoute.retrieve(req, resp);
})

app.post('/lessons', (req, resp) => {
    createLessonRoute.create(req, resp);
})

app.get('/lessons', (req, resp) => {
    retrieveAllLessonsRoute.retrieve(req, resp);
})

app.post('/reviews', (req,resp) => {
    createNewReviewRoute.create(req,resp);
})
app.get('/reviews', (req, resp)=>{
    retrieveAllReviewsRoute.retrieve(req,resp);
})
app.post('/scormProps', (req,resp) => {
    sendPhrasesToExportRoute.receiveScormProps(req,resp);
})
interface RequestWithFile extends express.Request {
    file: any,
}