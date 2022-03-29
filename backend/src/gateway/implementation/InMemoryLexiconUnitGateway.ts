import { LexiconUnit } from "../../domain/LexiconUnit";
import { LexiconUnitGateway } from "../api/LexiconUnitGateway";

export class InMemoryLexiconUnitGateway implements LexiconUnitGateway
{
    private readonly fs = require('fs');

    createUnit(unit: string, abbreviation: string, token: string | undefined): void {
        if (token === undefined)
            throw new Error("Unauthorized user");

        this.fs.stat("LexiconUnits.json", (err: any) => {
            const lexiconUnit = new LexiconUnit(unit, abbreviation);
            if (err) {
                const obj: { lexiconUnits: LexiconUnit[] } = {
                    lexiconUnits: []
                };
                obj.lexiconUnits.push(lexiconUnit)
                const json = JSON.stringify(obj);
                this.writeToFile(json);
            }
            else {
                this.appendToFile(lexiconUnit);
            }
        });
    }

    private writeToFile(json: string): void {
        this.fs.writeFile("LexiconUnits.json", json, (err: any) => {
            if (err)
                throw new Error("Writing to file failed");
        })
    }

    private appendToFile(lexiconUnit: LexiconUnit): void {

        this.fs.readFile('LexiconUnits.json', 'utf8', (err: any, data: any) => {
            if (err){
                throw new Error("Cannot read from an existing file");
            } else {
            try {
                const obj = JSON.parse(data);
                if (this.isWordAlreadyInFile(lexiconUnit, obj.lexiconUnits))
                    throw new Error("Word already exists");
                obj.lexiconUnits.push(lexiconUnit);
                const json = JSON.stringify(obj);
                this.writeToFile(json);
            } catch (e) {
                console.log(e);
            }
        }});
    }

    private isWordAlreadyInFile(lexiconUnit: LexiconUnit, allUnits: any): boolean {
        for (let i = 0; i < allUnits.length; i++) {
            if (allUnits[i].word.toLocaleLowerCase() === lexiconUnit.getWord().toLocaleLowerCase())
                return true;
        }
        return false;
    }

    retrieveAll(): LexiconUnit[] {
        const readLines = this.fs.readFileSync('LexiconUnits.json','utf8');
        const allUnits = JSON.parse(readLines).lexiconUnits;

        return this.transformToLexiconUnitArray(allUnits);
    }

    private transformToLexiconUnitArray(units: any): LexiconUnit[] {
        const lexiconUnits: LexiconUnit[] = [];
        units.forEach((element: any) => {
            const unit = new LexiconUnit(element.word, element.abbreviation);
            lexiconUnits.push(unit);
        });

        return lexiconUnits;
    }
}