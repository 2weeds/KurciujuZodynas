import { Observable } from "rxjs";
import { LexiconGateway } from "../../gateway/api/LexiconGateway";
import { CreateNewLexiconUnitUseCase } from "../api/CreateNewLexiconUnitUseCase";

export class CreateNewLexiconUnitInteractor implements CreateNewLexiconUnitUseCase {
    private readonly lexiconGW: LexiconGateway;

    constructor(lexiconGW: LexiconGateway) {
        this.lexiconGW = lexiconGW;
    }
    create(word: string, abbreviation: string, token: string | undefined): Observable<void> {
        return this.lexiconGW.createNewLexiconUnit(word, abbreviation, token);
    }
}