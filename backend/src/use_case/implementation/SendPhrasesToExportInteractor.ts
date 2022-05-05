import { Phrase } from "../../domain/Phrase";
import { PhraseGateway } from "../../gateway/api/PhraseGateway";
import { SendPhrasesToExportUseCase } from "../api/SendPhrasesToExportUseCase";

export class SendPhrasesToExportInteractor implements SendPhrasesToExportUseCase {
    private readonly gateway: PhraseGateway;

    constructor(gateway: PhraseGateway) {
        this.gateway = gateway;
    }
    send(phrasesArray: Phrase[]): void {
        this.gateway.sendToExport(phrasesArray);
    }
}