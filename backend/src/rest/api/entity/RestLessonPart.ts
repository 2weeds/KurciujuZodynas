export class RestLessonPart {
    private readonly name: string;
    private readonly subTopics: Object;

    constructor(name: string, subTopics: Object) {
        this.name = name;
        this.subTopics = subTopics;
    }

    getPartName(): string { return this.name; }

    getPartSubtopics(): Object { return this.subTopics; }
}