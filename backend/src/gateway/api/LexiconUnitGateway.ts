import { LexiconUnit } from "../../domain/LexiconUnit";

export interface LexiconUnitGateway {
    createUnit(unit: string, abbreviation: string, file: any): void;

    retrieveAll(): LexiconUnit[];
}