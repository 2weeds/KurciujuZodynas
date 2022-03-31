import { Phrase } from "../../domain/Phrase";
import { PhraseGateway } from "../api/PhraseGateway";

export class InMemoryPhraseGateway implements PhraseGateway
{
    private readonly fs = require('fs');

    createPhrase(phrase: string): void {
        this.fs.stat("Phrases.json", (err: any) => {
            const newPhrase = new Phrase(phrase);
            if (err) {
                const obj: { phrases: Phrase[] } = {
                    phrases: []
                };
                obj.phrases.push(newPhrase)
                const json = JSON.stringify(obj);
                this.writeToFile(json);
            }
            else {
                this.appendToFile(newPhrase);
            }
        });
    }

    private writeToFile(json: string): void {
        this.fs.writeFile("Phrases.json", json, (err: any) => {
            if (err)
                throw new Error("Writing to file failed");
        })
    }

    private appendToFile(phrase: Phrase): void {
        this.fs.readFile('Phrases.json', 'utf8', (err: any, data: any) => {
            if (err) {
                throw new Error("Cannot read from an existing file");
            } else {
            const obj = JSON.parse(data);
            obj.phrases.push(phrase);
            const json = JSON.stringify(obj);
            this.writeToFile(json);
        }});
    }

    retrieveAll(): Phrase[] {
        const readLines = this.fs.readFileSync('Phrases.json','utf8');
        const allPhrases = JSON.parse(readLines).phrases;

        return this.transformToPhrasesArray(allPhrases);
    }

    private transformToPhrasesArray(phrases: any): Phrase[] {
        const allPhrases: Phrase[] = [];
        phrases.forEach((element: any) => {
            const phrase = new Phrase(element.phrase);
            allPhrases.push(phrase);
        });

        return allPhrases;
    }
}