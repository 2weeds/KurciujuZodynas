export interface PhraseGateway {
    createPhrase(phrase: string, token: string | undefined): void;
}