export interface LexiconUnitGateway {
    createUnit(unit: string, abbreviation: string): void;
}