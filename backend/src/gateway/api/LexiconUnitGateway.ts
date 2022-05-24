import { LexiconUnit } from "../../domain/LexiconUnit";

export interface LexiconUnitGateway {
    createUnit(unit: string, abbreviation: string, file: any): void;
    sendToExport(lexiconUnitsArray:LexiconUnit[]): void;
    retrieveAll(): LexiconUnit[];
    createScormProps(scormProps:{authorsName:string, generalInformation:string}):void;
}