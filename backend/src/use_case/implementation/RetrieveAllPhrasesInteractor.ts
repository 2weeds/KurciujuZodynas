import { Phrase } from "../../domain/Phrase";
import { PhraseGateway } from "../../gateway/api/PhraseGateway";
import { BoundaryPhrase } from "../api/entity/BoundaryPhrase";
import { RetrieveAllPhrasesUseCase } from "../api/RetrieveAllPhrasesUseCase";

export class RetrieveAllPhrasesInteractor implements RetrieveAllPhrasesUseCase {
    private readonly phraseGW: PhraseGateway;

    constructor(phraseGW: PhraseGateway) {
        this.phraseGW = phraseGW;
    }
    
    retrieve(): BoundaryPhrase[] {
        return this.phraseGW.retrieveAll().map(element => this.convertD2BPhrase(element));
    }

    private convertD2BPhrase(phrase: Phrase): BoundaryPhrase {
        return new BoundaryPhrase(phrase.getPhrase())
    }
}