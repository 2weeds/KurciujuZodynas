import { LexiconUnit } from "../../domain/LexiconUnit";

export interface SendLexiconUnitsToExportUseCase {
    send(lexiconUnitsArray:LexiconUnit[]): void;
    create(scormProps:{authorsName:string,generalInformation:string}):void;
}