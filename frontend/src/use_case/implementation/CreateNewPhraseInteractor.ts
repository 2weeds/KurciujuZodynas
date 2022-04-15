import { Observable } from "rxjs";
import { PhraseGateway } from "../../gateway/api/PhraseGateway";
import { CreateNewPhraseUseCase } from "../api/CreateNewPhraseUseCase";

export class CreateNewPhraseInteractor implements CreateNewPhraseUseCase {
    private readonly phraseGW: PhraseGateway;

    constructor(phraseGW: PhraseGateway) {
        this.phraseGW = phraseGW;
    }
    create(phrase: string, file: File, token: string | undefined): Observable<void> {
        return this.phraseGW.createNewPhrase(phrase, file, token);
    }
}