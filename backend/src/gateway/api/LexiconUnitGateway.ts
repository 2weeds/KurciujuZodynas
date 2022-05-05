import { LexiconUnit } from "../../domain/LexiconUnit";

export interface LexiconUnitGateway {
    createUnit(unit: string, abbreviation: string, file: any): void;
    sendToExport(lexiconUnitsArray:LexiconUnit[]): void;
    retrieveAll(): LexiconUnit[];
}