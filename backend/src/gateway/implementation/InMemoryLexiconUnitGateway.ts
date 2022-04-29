import { LexiconUnit } from "../../domain/LexiconUnit";
import { LexiconUnitGateway } from "../api/LexiconUnitGateway";
import JSZip from 'jszip';

export class InMemoryLexiconUnitGateway implements LexiconUnitGateway {



    private readonly fs = require('fs');


    sendAll(lexiconUnitsArray: LexiconUnit[]): void {
        try {
            this.fs.writeFileSync('LexiconUnitsToExport.json', JSON.stringify(lexiconUnitsArray));
            var readableStream = this.fs.createReadStream('../backend/src/fileStorage/Scorm/indexHtmlTemplate.txt', { encoding: 'utf-8' });
            var writableStream = this.fs.createWriteStream('../backend/src/fileStorage/Scorm/Scorm_template/index.html');
            const array = JSON.stringify(lexiconUnitsArray);
            const data = JSON.parse(array);
            var TABLECONTENT = '';
            data ?
                data.map((unit: { word: string; }) => {
                    TABLECONTENT += '<tr><td align="right" style="width: 500px;">'
                        + unit.word + '</td><td><div style="width: 640px; height: 360px;">' +
                        '<video src="./resources/a.mp4" preload="auto" controls="" style="width: 100%; height: 100%;">' +
                        '</video></div></td></tr><tr>\n'
                }) : TABLECONTENT = '';
            if (TABLECONTENT == '') {

            } else {
                readableStream.on('data', function (dataChunk: any) {
                    var partialData = dataChunk.replace('TABLECONTENT', TABLECONTENT);
                    writableStream.write(partialData);
                });
            }
        }
        catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }


    createUnit(unit: string, abbreviation: string, file: any): void {
        const jsonObj = this.readFromFileOrCreateIfFileNotFound();
        const lexiconUnit = new LexiconUnit(unit, abbreviation, file);
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
            const unit = new LexiconUnit(element.word, element.abbreviation, element.file);
            lexiconUnits.push(unit);
        });

        return lexiconUnits;
    }

    private readFromFileOrCreateIfFileNotFound(): any {
        let obj: { lexiconUnits: LexiconUnit[] } = {
            lexiconUnits: []
        };
        try {
            const readLines = this.fs.readFileSync('LexiconUnits.json', 'utf8');
            obj = JSON.parse(readLines);
        } catch (err) {
            const json = JSON.stringify(obj);
            this.fs.writeFileSync('LexiconUnits.json', json);
        }

        return obj;
    }

}