import { Phrase } from "../../domain/Phrase";
import { PhraseGateway } from "../../gateway/api/PhraseGateway";
import { SendPhrasesToExportUseCase } from "../api/SendPhrasesToExportUseCase";

export class SendPhrasesToExportInteractor implements SendPhrasesToExportUseCase {
    private readonly gateway: PhraseGateway;

    constructor(gateway: PhraseGateway) {
        this.gateway = gateway;
    }
    create(scormProps: {authorsName:string,generalInformation:string}): void {
        this.gateway.createScormProps(scormProps)
    }
    send(phrasesArray: Phrase[]): void {
        this.gateway.sendToExport(phrasesArray);
    }
}