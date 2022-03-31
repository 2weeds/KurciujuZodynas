import { LexiconUnit } from "../../domain/LexiconUnit";

export interface LexiconUnitGateway {
    createUnit(unit: string, abbreviation: string): void;

    retrieveAll(): LexiconUnit[];
}