import { LexiconUnitGateway } from "../../gateway/api/LexiconUnitGateway";
import { CreateNewLexiconUnitUseCase } from "../api/CreateNewLexiconUnitUseCase";

export class CreateNewLexiconUnitInteractor implements CreateNewLexiconUnitUseCase {
    private readonly gateway: LexiconUnitGateway;

    constructor(gateway: LexiconUnitGateway) {
        this.gateway = gateway;
    }

    create(unit: string, abbreviation: string, file: any): void {
        this.gateway.createUnit(unit, abbreviation, file);
    }
}