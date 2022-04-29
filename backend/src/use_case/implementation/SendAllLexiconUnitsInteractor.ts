import { LexiconUnit } from "../../domain/LexiconUnit";
import { LexiconUnitGateway } from "../../gateway/api/LexiconUnitGateway";
import { SendAllLexiconUnitsUseCase } from "../api/SendAllLexiconUnitsUseCase";

export class SendAllLexiconUnitsInteractor implements SendAllLexiconUnitsUseCase {
    private readonly gateway: LexiconUnitGateway;

    constructor(gateway: LexiconUnitGateway) {
        this.gateway = gateway;
    }
    send(lexiconUnitsArray: LexiconUnit[]): void {
        this.gateway.sendAll(lexiconUnitsArray);
    }
}