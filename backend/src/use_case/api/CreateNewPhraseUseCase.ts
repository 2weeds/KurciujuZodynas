export interface CreateNewPhraseUseCase {
    create(phrase: string, file: any): void;
}