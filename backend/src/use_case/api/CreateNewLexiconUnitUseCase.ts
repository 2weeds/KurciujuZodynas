export interface CreateNewLexiconUnitUseCase {
    create(unit: string, abbreviation: string): void;
}