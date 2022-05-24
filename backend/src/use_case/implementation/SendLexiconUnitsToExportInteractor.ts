import { LexiconUnit } from "../../domain/LexiconUnit";
import { LexiconUnitGateway } from "../../gateway/api/LexiconUnitGateway";
import { SendLexiconUnitsToExportUseCase } from "../api/SendLexiconUnitsToExportUseCase";

export class SendLexiconUnitsToExportInteractor implements SendLexiconUnitsToExportUseCase {
    private readonly gateway: LexiconUnitGateway;

    constructor(gateway: LexiconUnitGateway) {
        this.gateway = gateway;
    }
    create(scormProps: {authorsName:string,generalInformation:string}): void {
        this.gateway.createScormProps(scormProps)
    }
    send(lexiconUnitsArray: LexiconUnit[]): void {
        this.gateway.sendToExport(lexiconUnitsArray);
    }
}