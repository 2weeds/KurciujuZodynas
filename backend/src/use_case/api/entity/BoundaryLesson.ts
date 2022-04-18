import { BoundaryLessonPart } from "./BoundaryLessonPart";

export class BoundaryLesson {
    private readonly name: string;
    private readonly goal: string;
    private readonly parts: BoundaryLessonPart[];

    constructor(name: string, goal: string, parts: BoundaryLessonPart[]) {
        this.name = name;
        this.goal = goal;
        this.parts = parts;
    }

    getName(): string {
        return this.name;
    }

    getGoal(): string {
        return this.goal;
    }

    getParts(): BoundaryLessonPart[] {
        return this.parts;
    }
}