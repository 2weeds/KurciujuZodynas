import { LessonPart } from "./LessonPart";

export class Lesson {
    private readonly name: string;
    private readonly goal: string;
    private readonly parts: LessonPart[];

    constructor(name: string, goal: string, parts: LessonPart[]) {
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

    getParts(): LessonPart[] {
        return this.parts;
    }
}