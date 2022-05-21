import { PhraseGateway } from "../../gateway/api/PhraseGateway";
import { CreateNewPhraseUseCase } from "../api/CreateNewPhraseUseCase";

export class CreateNewPhraseInteractor implements CreateNewPhraseUseCase {
    private readonly gateway: PhraseGateway;

    constructor(gateway: PhraseGateway) {
        this.gateway = gateway;
    }

    create(phrase: string, file: any): void {
<<<<<<< Updated upstream
        this.gateway.createPhrase(phrase, file);
=======
        const formattedPhrase = phrase[0].toUpperCase() + phrase.slice(1, phrase.length).toLowerCase();
        console.log(formattedPhrase);
        this.gateway.createPhrase(formattedPhrase, file);
>>>>>>> Stashed changes
    }
}