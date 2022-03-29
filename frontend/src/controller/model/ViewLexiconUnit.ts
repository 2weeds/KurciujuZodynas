export class ViewLexiconUnit {
    readonly word: string;
    readonly abbreviation: string;

    constructor(word: string, abbreviation: string) {
        this.word = word;
        this.abbreviation = abbreviation;
    }
}