import { LexiconUnit } from "../../domain/LexiconUnit";
import { LexiconUnitGateway } from "../api/LexiconUnitGateway";
import JSZip from 'jszip';
import FileSaver, { saveAs } from 'file-saver';
import { Blob } from "buffer";

export class InMemoryLexiconUnitGateway implements LexiconUnitGateway
{
    
    

    private readonly fs = require('fs');

    
    sendAll(lexiconUnitsArray: LexiconUnit[]): void {
        try{
            if(this.fs.existsSync('LexiconUnitsToExport.json')){
                this.fs.unlinkSync('LexiconUnitsToExport.json');
                this.fs.writeFileSync('LexiconUnitsToExport.json', JSON.stringify(lexiconUnitsArray));
            }
            else{
                this.fs.writeFileSync('LexiconUnitsToExport.json', JSON.stringify(lexiconUnitsArray));
            }
            var fileContent = this.fs.readFileSync('../frontend/src/resources/Scorm_template/indextest.txt','utf-8');
            const array = JSON.stringify(lexiconUnitsArray);
            const data = JSON.parse(array);
            var TABLECONTENTT= '';
            data.map((unit: { word: string; })=>{
                TABLECONTENTT += '<tr><td align="right" style="width: 500px;">'+unit.word+'</td><td><div style="width: 640px; height: 360px;"><video src="./resources/a.mp4" preload="auto" controls="" style="width: 100%; height: 100%;"></video></div></td></tr><tr>'});
            fileContent = fileContent.replace('TABLECONTENT', TABLECONTENTT);
            this.fs.writeFileSync('../frontend/src/resources/Scorm_template/index.html', fileContent);
            const zl = require("zip-lib");

            zl.archiveFolder("../frontend/src/resources/Scorm_template", "../frontend/src/resources/ZipToExport.zip").then(function () {
                console.log("ready to export");
            }, function (err: any) {
                console.log(err);
            });
            
        }
        catch(err){
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
            const readLines = this.fs.readFileSync('LexiconUnits.json','utf8');
            obj = JSON.parse(readLines);
        } catch (err) {
            const json = JSON.stringify(obj);
            this.fs.writeFileSync('LexiconUnits.json', json);
        }

        return obj;
    }

}