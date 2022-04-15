export class RestExplanation {
    private readonly text: string;

    constructor(text: string) {
        this.text = text;
    }

    getText(): string { return this.text; }
}