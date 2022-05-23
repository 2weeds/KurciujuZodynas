import { LexiconUnitGateway } from "../../gateway/api/LexiconUnitGateway";
import { CreateNewLexiconUnitUseCase } from "../api/CreateNewLexiconUnitUseCase";

export class CreateNewLexiconUnitInteractor implements CreateNewLexiconUnitUseCase {
    private readonly gateway: LexiconUnitGateway;

    constructor(gateway: LexiconUnitGateway) {
        this.gateway = gateway;
    }

    create(unit: string, abbreviation: string, file: any): void {
        const formattedUnit = unit[0].toUpperCase() + unit.slice(1, unit.length);
        this.gateway.createUnit(formattedUnit, abbreviation.toLowerCase(), file);
    }
}