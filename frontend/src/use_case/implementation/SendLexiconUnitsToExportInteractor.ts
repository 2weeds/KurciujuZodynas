import { Observable } from "rxjs";
import { LexiconUnit } from "../../domain/LexiconUnit";
import { LexiconGateway } from "../../gateway/api/LexiconGateway";
import { RestLexiconGateway } from "../../gateway/implementation/RestLexiconGateway";
import { SendLexiconUnitsToExportUseCase } from "../api/SendLexiconUnitsToExportUseCase";

export class SendLexiconUnitsToExportInteractor implements SendLexiconUnitsToExportUseCase {
    private readonly lexiconGW: LexiconGateway;

    constructor(lexiconGW: LexiconGateway){
        this.lexiconGW = lexiconGW;
    }

    send(lexiconUnitsArray:LexiconUnit[]): Observable<void> {
        return this.lexiconGW
            .sendLexiconUnitsToExport(lexiconUnitsArray);
    }
}