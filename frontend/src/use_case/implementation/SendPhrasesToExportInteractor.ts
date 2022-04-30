import { Observable } from "rxjs";
import { Phrase } from "../../domain/Phrase";
import { LexiconGateway } from "../../gateway/api/LexiconGateway";
import { PhraseGateway } from "../../gateway/api/PhraseGateway";
import { SendPhrasesToExportUseCase } from "../api/SendPhrasesToExportUseCase";

export class SendPhrasesToExportInteractor implements SendPhrasesToExportUseCase {
    private readonly phraseGW: PhraseGateway;

    constructor(phraseGW: PhraseGateway){
        this.phraseGW = phraseGW;
    }

    send(phrasesArray:Phrase[]): Observable<void> {
        return this.phraseGW
            .sendPhrasesToExport(phrasesArray);
    }
}