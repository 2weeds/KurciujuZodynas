import { PhraseGateway } from "../api/PhraseGateway";

export class InMemoryPhraseGateway implements PhraseGateway
{
    private readonly fs = require('fs');
    createPhrase(phrase: string, token: string | undefined): void {
        if (token === undefined)
            throw new Error("Unauthorized user");

        this.fs.stat("Phrases.json", (err: any) => {
            if (err) {
                const obj: { phrases: string[] } = {
                    phrases: []
                };
                obj.phrases.push(phrase)
                const json = JSON.stringify(obj);
                this.writeToFile(json);
            }
            else {
                this.appendToFile(phrase);
            }
        });
    }

    private writeToFile(json: string): void {
        this.fs.writeFile("Phrases.json", json, (err: any) => {
            if (err)
                throw new Error("Writing to file failed");
        })
    }

    private appendToFile(phrase: string): void {
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
}