import { LexiconUnit } from "../../domain/LexiconUnit";
import { LexiconUnitGateway } from "../../gateway/api/LexiconUnitGateway";
import { SendLexiconUnitsToExportUseCase } from "../api/SendLexiconUnitsToExportUseCase";

export class SendLexiconUnitsToExportInteractor implements SendLexiconUnitsToExportUseCase {
    private readonly gateway: LexiconUnitGateway;

    constructor(gateway: LexiconUnitGateway) {
        this.gateway = gateway;
    }
    send(lexiconUnitsArray: LexiconUnit[]): void {
        this.gateway.sendToExport(lexiconUnitsArray);
    }
}