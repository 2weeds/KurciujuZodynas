export class BoundaryLexiconUnit {
    readonly word: string;
    readonly abbreviation: string;
    readonly file: File;

    constructor(word: string, abbreviation: string, file: File) {
        this.word = word;
        this.abbreviation = abbreviation;
        this.file = file;
    }
}