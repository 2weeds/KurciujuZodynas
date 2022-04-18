import { BoundaryLessonPart } from './BoundaryLessonPart';

export class BoundaryLesson {
    readonly name: string;
    readonly goal: string
    readonly parts: BoundaryLessonPart[];

    constructor(name: string, goal: string, parts: BoundaryLessonPart[]) {
        this.name = name;
        this.goal = goal;
        this.parts = parts;
    }
}