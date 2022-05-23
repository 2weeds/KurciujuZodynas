import { Lesson } from "../../domain/Lesson";
import { LessonPart } from "../../domain/LessonPart";
import { LessonGateway } from "../../gateway/api/LessonGateway";
import { CreateNewLessonUseCase } from "../api/CreateNewLessonUseCase";
import { BoundaryLesson } from "../api/entity/BoundaryLesson";
import { BoundaryLessonPart } from "../api/entity/BoundaryLessonPart";
import { BoundaryLexiconUnit } from "../api/entity/BoundaryLexiconUnit";
import { BoundaryPhrase } from "../api/entity/BoundaryPhrase";

export class CreateNewLessonInteractor implements CreateNewLessonUseCase {
    private readonly gateway: LessonGateway;

    constructor(gateway: LessonGateway) {
        this.gateway = gateway;
    }

    create(lesson: BoundaryLesson): void {
        this.gateway.createLesson(this.convertToDomain(lesson));
    }

    private convertToDomain(lesson: BoundaryLesson): Lesson {
        const convertedParts: LessonPart[] = lesson.getParts().map(part => (this.sortPartSubtopics(part)))
        return new Lesson(lesson.getName(), lesson.getGoal(), convertedParts);
    }
    
    private sortPartSubtopics(part: BoundaryLessonPart): LessonPart {
        const subtopics: Map<string, any> = new Map();
        if (part.getPartSubtopics().has('lexicon'))
            subtopics.set('lexicon', part.getPartSubtopics().get('lexicon').sort((a: any, b: any) => a.word.localeCompare(b.word)))
        if (part.getPartSubtopics().has('phrases'))
            subtopics.set('phrases', part.getPartSubtopics().get('phrases').sort((a: any, b: any) => a.phrase.localeCompare(b.phrase)))
        if (part.getPartSubtopics().has('grammar'))
            subtopics.set('grammar', part.getPartSubtopics().get('grammar'))
        if (part.getPartSubtopics().has('information'))
            subtopics.set('information', part.getPartSubtopics().get('information'))
        if (part.getPartSubtopics().has('test'))
            subtopics.set('test', part.getPartSubtopics().get('test'))
        
        return this.convertPartToDomain(new BoundaryLessonPart(part.getPartName(), subtopics))
    }

    private convertPartToDomain(part: BoundaryLessonPart): LessonPart {
        return new LessonPart(part.getPartName(), Object.fromEntries(part.getPartSubtopics()))
    }
}