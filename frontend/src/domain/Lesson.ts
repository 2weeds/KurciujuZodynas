import { LessonPart } from './LessonPart';

export class Lesson {
    readonly name: string;
    readonly goal: string
    readonly parts: LessonPart[];

    constructor(name: string, goal: string, parts: LessonPart[]) {
        this.name = name;
        this.goal = goal;
        this.parts = parts;
    }
}