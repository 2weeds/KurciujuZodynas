import { Phrase } from "../../domain/Phrase";
import { PhraseGateway } from "../api/PhraseGateway";

export class InMemoryPhraseGateway implements PhraseGateway
{
    private readonly fs = require('fs');

    createPhrase(phrase: string): void {
        const jsonObj = this.readFromFileOrCreateIfFileNotFound();
        const newPhrase = new Phrase(phrase);
        try {
            if (this.isPhraseAlreadyInFile(newPhrase, jsonObj.phrases)) {
                    throw new Error("Phrase already exists");
            } else {
                jsonObj.phrases.push(newPhrase);
                const json = JSON.stringify(jsonObj);
                this.fs.writeFileSync('Phrases.json', json);
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
            const phrase = new Phrase(element.phrase);
            allPhrases.push(phrase);
        });

        return allPhrases;
    }

    private readFromFileOrCreateIfFileNotFound(): any {
        let obj: { phrases: Phrase[] } = {
            phrases: []
        };
        try {
            const readLines = this.fs.readFileSync('Phrases.json','utf8');
            obj = JSON.parse(readLines);
        } catch (err) {
            const json = JSON.stringify(obj);
            this.fs.writeFileSync('Phrases.json', json);
        }

        return obj;
    }
}