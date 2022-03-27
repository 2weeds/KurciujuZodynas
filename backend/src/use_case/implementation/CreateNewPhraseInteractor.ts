import { PhraseGateway } from "../../gateway/api/PhraseGateway";
import { CreateNewPhraseUseCase } from "../api/CreateNewPhraseUseCase";

export class CreateNewPhraseInteractor implements CreateNewPhraseUseCase {
    private readonly gateway: PhraseGateway;

    constructor(gateway: PhraseGateway) {
        this.gateway = gateway;
    }

    create(phrase: string, token: string | undefined): void {
        this.gateway.createPhrase(phrase, token);
    }
}