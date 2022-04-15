export class BoundaryPhrase {
    readonly phrase: string;
    readonly file: File;

    constructor(phrase: string, file: File) {
        this.phrase = phrase;
        this.file = file;
    }
}