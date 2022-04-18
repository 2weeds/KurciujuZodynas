import { Phrase } from "../../domain/Phrase";

export interface PhraseGateway {
    createPhrase(phrase: string, file: any): void;

    retrieveAll(): Phrase[];
}