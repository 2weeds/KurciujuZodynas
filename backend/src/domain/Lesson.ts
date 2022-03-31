export class Lesson {
    private readonly name: string;
    private readonly goal: string;
    private readonly topicNames: string[];
    private readonly topicMaterial: any[];

    constructor(name: string, goal: string, topicNames: string[], topicMaterial: any[]) {
        this.name = name;
        this.goal = goal;
        this.topicNames = topicNames;
        this.topicMaterial = topicMaterial;
    }

    getName(): string {
        return this.name;
    }

    getGoal(): string {
        return this.goal;
    }

    getTopicNames(): string[] {
        return this.topicNames;
    }

    getTopicMaterial(): any[] {
        return this.topicMaterial;
    }
}