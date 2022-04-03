import { LexiconUnit } from "../../domain/LexiconUnit";
import { LexiconUnitGateway } from "../api/LexiconUnitGateway";

export class InMemoryLexiconUnitGateway implements LexiconUnitGateway
{
    private readonly fs = require('fs');

    createUnit(unit: string, abbreviation: string): void {
        const jsonObj = this.readFromFileOrCreateIfFileNotFound();
        const lexiconUnit = new LexiconUnit(unit, abbreviation);
        try {
            if (this.isWordAlreadyInFile(lexiconUnit, jsonObj.lexiconUnits)) {
                    throw new Error("Word already exists");
            } else {
                jsonObj.lexiconUnits.push(lexiconUnit);
                const json = JSON.stringify(jsonObj);
                this.fs.writeFileSync('LexiconUnits.json', json);
            }
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }

    private isWordAlreadyInFile(lexiconUnit: LexiconUnit, allUnits: any): boolean {
        for (let i = 0; i < allUnits.length; i++) {
            if (allUnits[i].word.toLocaleLowerCase() === lexiconUnit.getWord().toLocaleLowerCase())
                return true;
        }
        return false;
    }

    retrieveAll(): LexiconUnit[] {
        const jsonObj = this.readFromFileOrCreateIfFileNotFound();

        return this.transformToLexiconUnitArray(jsonObj.lexiconUnits);
    }

    private transformToLexiconUnitArray(units: any): LexiconUnit[] {
        const lexiconUnits: LexiconUnit[] = [];
        units.forEach((element: any) => {
            const unit = new LexiconUnit(element.word, element.abbreviation);
            lexiconUnits.push(unit);
        });

        return lexiconUnits;
    }

    private readFromFileOrCreateIfFileNotFound(): any {
        let obj: { lexiconUnits: LexiconUnit[] } = {
            lexiconUnits: []
        };
        try {
            const readLines = this.fs.readFileSync('LexiconUnits.json','utf8');
            obj = JSON.parse(readLines);
        } catch (err) {
            const json = JSON.stringify(obj);
            this.fs.writeFileSync('LexiconUnits.json', json);
        }

        return obj;
    }
}