export interface CreateNewLexiconUnitUseCase {
    create(unit: string, abbreviation: string, token: string | undefined): void;
}