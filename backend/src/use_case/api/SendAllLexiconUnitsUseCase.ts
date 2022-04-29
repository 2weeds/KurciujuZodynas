import { LexiconUnit } from "../../domain/LexiconUnit";

export interface SendAllLexiconUnitsUseCase {
    send(lexiconUnitsArray:LexiconUnit[]): void;
}