import { LexiconUnit } from "../../domain/LexiconUnit";

export interface LexiconUnitGateway {
    createUnit(unit: string, abbreviation: string, token: string | undefined): void;

    retrieveAll(): LexiconUnit[];
}