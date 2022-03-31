import { Phrase } from "../../domain/Phrase";

export interface PhraseGateway {
    createPhrase(phrase: string): void;

    retrieveAll(): Phrase[];
}