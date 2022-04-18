export class LexiconUnit {
    private readonly word: string;
    private readonly abbreviation: string;
    private readonly file: any;

    constructor(word: string, abbreviation: string, file: any) {
        this.word = word;
        this.abbreviation = abbreviation;
        this.file = file;
    }

    getWord() { return this.word; }

    getAbbreviation() { return this.abbreviation; }

    getFile() { return this.file; }
}