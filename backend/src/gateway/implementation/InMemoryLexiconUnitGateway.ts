import { LexiconUnitGateway } from "../api/LexiconUnitGateway";

export class InMemoryLexiconUnitGateway implements LexiconUnitGateway
{
    private readonly fs = require('fs');
    createUnit(unit: string, abbreviation: string, token: string | undefined): void {
        if (token === undefined)
            throw new Error("Unauthorized user");

        const stream = this.fs.createWriteStream("LexiconUnits.txt", {flags: "a"})
        stream.write("Word: " + unit + " Abbreviation: " + abbreviation + "\n");
    }
}