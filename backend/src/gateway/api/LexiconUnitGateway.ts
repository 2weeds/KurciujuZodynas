import { LexiconUnit } from "../../domain/LexiconUnit";

export interface LexiconUnitGateway {
    createUnit(unit: string, abbreviation: string, file: any): void;
    sendAll(lexiconUnitsArray:LexiconUnit[]): void;
    retrieveAll(): LexiconUnit[];
}