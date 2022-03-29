export class RestLexiconUnit {
    private readonly word: string;
    private readonly abbreviation: string;

    constructor(word: string, abbreviation: string) {
        this.word = word;
        this.abbreviation = abbreviation;
    }

    getWord() { return this.word; }

    getAbbreviation() { return this.abbreviation; }
}