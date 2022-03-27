export interface CreateNewPhraseUseCase {
    create(phrase: string, token: string | undefined): void;
}