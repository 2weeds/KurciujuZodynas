import { Lesson } from "../../domain/Lesson";
import { LessonPart } from "../../domain/LessonPart";
import { LessonGateway } from "../api/LessonGateway";

export class InMemoryLessonGateway implements LessonGateway {

    private readonly fs = require('fs');

    createLesson(lesson: Lesson): void {
        const jsonObj = this.readFromFileOrCreateIfFileNotFound();
        try {
            if (this.isLessonAlreadyInFile(lesson, jsonObj.lessons)) {
                    throw new Error("Lesson already exists");
            } else {
                jsonObj.lessons.push(lesson);
                const json = JSON.stringify(jsonObj);
                this.fs.writeFileSync('Lessons.json', json);
            }
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }

    private isLessonAlreadyInFile(lesson: Lesson, allLessons: any): boolean {
        for (let i = 0; i < allLessons.length; i++) {
            if ((allLessons[i].name.toLocaleLowerCase() === lesson.getName().toLocaleLowerCase()) &&
                 allLessons[i].goal.toLocaleLowerCase() === lesson.getGoal().toLocaleLowerCase())
                return true;
        }
        return false;
    }

    retrieveAll(): Lesson[] {
        const jsonObj = this.readFromFileOrCreateIfFileNotFound();

        return this.transformToLessonArray(jsonObj.lessons);
    }

    private transformToLessonArray(lessons: any): Lesson[] {
        const allLessons: Lesson[] = [];
        lessons.forEach((element: any) => {
            const lesson = new Lesson(element.name, element.goal, element.parts);
            allLessons.push(lesson);
        });
        return allLessons;
    }

    private readFromFileOrCreateIfFileNotFound(): any {
        let obj: { lessons: Lesson[] } = {
            lessons: []
        };
        try {
            const readLines = this.fs.readFileSync('Lessons.json','utf8');
            obj = JSON.parse(readLines);
        } catch (err) {
            const json = JSON.stringify(obj);
            this.fs.writeFileSync('Lessons.json', json);
        }

        return obj;
    }
}