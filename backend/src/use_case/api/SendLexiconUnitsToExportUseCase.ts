import { LexiconUnit } from "../../domain/LexiconUnit";

export interface SendLexiconUnitsToExportUseCase {
    send(lexiconUnitsArray:LexiconUnit[]): void;
}