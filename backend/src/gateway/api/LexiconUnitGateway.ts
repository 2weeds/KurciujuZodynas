export interface LexiconUnitGateway {
    createUnit(unit: string, abbreviation: string, token: string | undefined): void;
}