import { LexiconUnitGateway } from "../api/LexiconUnitGateway";

export class InMemoryLexiconUnitGateway implements LexiconUnitGateway
{
    private readonly fs = require('fs');
    createUnit(unit: string, abbreviation: string): void {
        this.fs.writeFile('file.txt', 'Unit: ' + unit + " Abbreviation: " + abbreviation,  function(err: Error) {
            if (err) {
                return console.error(err);
            }
            console.log("File created!");
        });
    }
}