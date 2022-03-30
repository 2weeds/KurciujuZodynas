import { Phrase } from "../../domain/Phrase";

export interface PhraseGateway {
    createPhrase(phrase: string, token: string | undefined): void;

    retrieveAll(): Phrase[];
}