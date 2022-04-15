export class LessonPart {
    readonly name: string;
    readonly subTopics: Object;

    constructor(name: string, subTopics: Object) {
        this.name = name;
        this.subTopics = subTopics;
    }
}