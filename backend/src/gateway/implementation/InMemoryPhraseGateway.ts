import { PhraseGateway } from "../api/PhraseGateway";

export class InMemoryPhraseGateway implements PhraseGateway
{
    private readonly fs = require('fs');
    createPhrase(phrase: string): void {
        const stream = this.fs.createWriteStream("Phrases.txt", {flags: "a"})
        stream.write("Phrase: " + phrase + "\n");
    }
}