import { Phrase } from "../../domain/Phrase";
import { PhraseGateway } from "../api/PhraseGateway";
import path from "path";

export class InMemoryPhraseGateway implements PhraseGateway {
    private readonly filename: string;
    private readonly fs = require('fs');
    private readonly wrench = require('wrench');
    constructor(filename: string) {
        this.filename = filename;
    }
    createScormProps(scormProps: { authorsName: string; generalInformation: string; }): void {
        console.log('a')
        this.wrench.copyDirSyncRecursive('../backend/src/fileStorage/ScormTemplate', '../backend/src/fileStorage/ExportScorm',{
            forceDelete: true,
        });
        // this.wrench.rmdirSyncRecursive('../backend/src/fileStorage/ExportScorm', true);
        // this.fs.copy("../backend/src/fileStorage/ScormTemplate", "../backend/src/fileStorage/ExportScorm", function (err: any) {
        // if (err) {
        //     console.error(err);
        // } 
        // else {
        //     console.log("success!");
        // }
        // });
    }
    
    sendToExport(phrasesArray: Phrase[]): void {
        try {
            this.fs.writeFileSync('LexiconUnitsToExport.json', JSON.stringify(phrasesArray));
            var readableStream = this.fs.createReadStream('../backend/src/fileStorage/Scorm/indexHtmlTemplate.txt', { encoding: 'utf-8' });
            var writableStream = this.fs.createWriteStream('../backend/src/fileStorage/Scorm/Scorm_template/index.html');
            const array = JSON.stringify(phrasesArray);
            const data = JSON.parse(array);
            var TABLECONTENT = '';
            data ?
                data.map((unit: { phrase: string; file:any }) => {
                    TABLECONTENT += '<tr><td align="right" style="width: 500px;">'
                        + unit.phrase + '</td><td><div style="width: 640px; height: 360px;">' +
                        '<video src="./resources/a.mp4" preload="auto" controls="" style="width: 100%; height: 100%;">' +
                        '</video></div></td></tr><tr>\n'
                }) : TABLECONTENT = '';
            if (TABLECONTENT == '') {

            } else {
                readableStream.on('data', function (dataChunk: any) {
                    var partialData = dataChunk.replace('TABLECONTENT', TABLECONTENT);
                    writableStream.write(partialData);
                });
                const zl = require("zip-lib");

                zl.archiveFolder("./../backend/src/fileStorage/Scorm/Scorm_template", "../backend/src/fileStorage/Scorm/ZipToExport.txt",(function (err: any) {
                    console.log(err);
                }));
            }
        }
        catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }
    
    createPhrase(phrase: string, file: any): void {
        const jsonObj = this.readFromFileOrCreateIfFileNotFound();
        const newPhrase = new Phrase(phrase, file);
        try {
            if (this.isPhraseAlreadyInFile(newPhrase, jsonObj.phrases)) {
                    throw new Error("Phrase already exists");
            } else {
                jsonObj.phrases.push(newPhrase);
                const json = JSON.stringify(jsonObj);
                this.fs.writeFileSync(this.filename + '.json', json);
            }
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }

    private isPhraseAlreadyInFile(phrase: Phrase, allPhrases: any): boolean {
        for (let i = 0; i < allPhrases.length; i++) {
            if (allPhrases[i].phrase.toLocaleLowerCase() === phrase.getPhrase().toLocaleLowerCase())
                return true;
        }
        return false;
    }

    retrieveAll(): Phrase[] {
        const jsonObj = this.readFromFileOrCreateIfFileNotFound();

        return this.transformToPhrasesArray(jsonObj.phrases);
    }

    private transformToPhrasesArray(phrases: any): Phrase[] {
        const allPhrases: Phrase[] = [];
        phrases.forEach((element: any) => {
            const phrase = new Phrase(element.phrase, element.file);
            allPhrases.push(phrase);
        });

        return allPhrases;
    }

    private readFromFileOrCreateIfFileNotFound(): any {
        let obj: { phrases: Phrase[] } = {
            phrases: []
        };
        try {
            const readLines = this.fs.readFileSync(this.filename + '.json','utf8');
            obj = JSON.parse(readLines);
        } catch (err) {
            const json = JSON.stringify(obj);
            this.fs.writeFileSync(this.filename + '.json', json);
        }

        return obj;
    }
}

function useState<T>(arg0: any): [any, any] {
    throw new Error("Function not implemented.");
}
