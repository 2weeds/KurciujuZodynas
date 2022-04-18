export class BoundaryPhrase {
    private readonly phrase: string;
    private readonly file: any;

    constructor(phrase: string, file: any) {
        this.phrase = phrase;
        this.file = file;
    }

    getPhrase() { return this.phrase; }

    getFile() { return this.file; }
}