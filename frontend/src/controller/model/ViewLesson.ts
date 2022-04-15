import { ViewLessonPart } from './ViewLessonPart';

export class ViewLesson {
    readonly name: string;
    readonly goal: string
    readonly parts: ViewLessonPart[];

    constructor(name: string, goal: string, parts: ViewLessonPart[]) {
        this.name = name;
        this.goal = goal;
        this.parts = parts;
    }
}