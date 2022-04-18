export class BoundaryLessonPart {
    readonly name: string;
    readonly subTopics: Map<string, any>;

    constructor(name: string, subTopics: Map<string, any>) {
        this.name = name;
        this.subTopics = subTopics;
    }
}