export class BoundaryLessonPart {
    private readonly name: string;
    private readonly subTopics: Map<string, any>;

    constructor(name: string, subTopics: Map<string, any>) {
        this.name = name;
        this.subTopics = subTopics;
    }

    getPartName(): string { return this.name; }

    getPartSubtopics(): Map<string, any> { return this.subTopics; }
}