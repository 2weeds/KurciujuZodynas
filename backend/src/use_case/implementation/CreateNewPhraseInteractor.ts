import { PhraseGateway } from "../../gateway/api/PhraseGateway";
import { CreateNewPhraseUseCase } from "../api/CreateNewPhraseUseCase";

export class CreateNewPhraseInteractor implements CreateNewPhraseUseCase {
    private readonly gateway: PhraseGateway;

    constructor(gateway: PhraseGateway) {
        this.gateway = gateway;
    }

    create(phrase: string, file: any): void {
        const formattedPhrase = phrase[0].toUpperCase() + phrase.slice(1, phrase.length);
        this.gateway.createPhrase(formattedPhrase, file);
    }

}