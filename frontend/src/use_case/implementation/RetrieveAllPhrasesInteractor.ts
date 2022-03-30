import { map, Observable } from "rxjs";
import { Phrase } from "../../domain/Phrase";
import { PhraseGateway } from "../../gateway/api/PhraseGateway";
import { RetrieveAllPhrasesUseCase } from "../api/RetrieveAllPhrasesUseCase";
import { BoundaryPhrase } from "../model/BoundaryPhrase";

export class RetrieveAllPhrasesInteractor implements RetrieveAllPhrasesUseCase {
    private readonly phraseGW: PhraseGateway;

    constructor(phraseGW: PhraseGateway){
        this.phraseGW = phraseGW;
    }

    retrieve(): Observable<BoundaryPhrase[]> {
        return this.phraseGW
            .retrieveAllPhrases()
            .pipe(map((phraseArray) => this.convertD2B(phraseArray)));
    }

    private convertD2B(phraseArray: Phrase[]): BoundaryPhrase[] {
        const boundaryPhraseArray: BoundaryPhrase[] = [];
        phraseArray.forEach(phrase => boundaryPhraseArray.push(phrase));

        return boundaryPhraseArray;
    }
}