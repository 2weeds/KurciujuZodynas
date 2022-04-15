export interface CreateNewLexiconUnitUseCase {
    create(unit: string, abbreviation: string, file: any): void;
}