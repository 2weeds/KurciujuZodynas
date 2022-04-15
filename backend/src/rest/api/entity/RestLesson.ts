import { RestLessonPart } from "./RestLessonPart";

export class RestLesson {
    private readonly name: string;
    private readonly goal: string;
    private readonly parts: RestLessonPart[];

    constructor(name: string, goal: string, parts: RestLessonPart[]) {
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

    getParts(): RestLessonPart[] {
        return this.parts;
    }
}