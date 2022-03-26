import { Observable } from "rxjs";
import { PhraseGateway } from "../../gateway/api/PhraseGateway";
import { CreateNewPhraseUseCase } from "../api/CreateNewPhraseUseCase";

export class CreateNewPhraseInteractor implements CreateNewPhraseUseCase {
    private readonly phraseGW: PhraseGateway;

    constructor(phraseGW: PhraseGateway) {
        this.phraseGW = phraseGW;
    }
    create(phrase: string): Observable<void> {
        return this.phraseGW.createNewPhrase(phrase);
    }
}