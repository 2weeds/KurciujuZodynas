export class BoundaryPhrase {
    private readonly phrase: string;

    constructor(phrase: string) {
        this.phrase = phrase;
    }

    getPhrase() { return this.phrase; }
}