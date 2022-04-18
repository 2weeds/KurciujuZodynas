import { PhraseGateway } from "../../gateway/api/PhraseGateway";
import { CreateNewPhraseUseCase } from "../api/CreateNewPhraseUseCase";

export class CreateNewPhraseInteractor implements CreateNewPhraseUseCase {
    private readonly gateway: PhraseGateway;

    constructor(gateway: PhraseGateway) {
        this.gateway = gateway;
    }

    create(phrase: string, file: any): void {
        this.gateway.createPhrase(phrase, file);
    }
}