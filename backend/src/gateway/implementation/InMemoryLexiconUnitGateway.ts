import { LexiconUnitGateway } from "../api/LexiconUnitGateway";

export class InMemoryLexiconUnitGateway implements LexiconUnitGateway
{
    private readonly fs = require('fs');
    createUnit(unit: string, abbreviation: string): void {
        const stream = this.fs.createWriteStream("lexiconUnits.txt", {flags: "a"})
        stream.write("Unit: " + unit + " Abbreviation: " + abbreviation + "\n");
    }
}