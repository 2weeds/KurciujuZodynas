import { Request, Response } from "express";
import { BoundaryLesson } from "../../use_case/api/entity/BoundaryLesson";
import { BoundaryLessonPart } from "../../use_case/api/entity/BoundaryLessonPart";
import { RetrieveAllLessonsUseCase } from "../../use_case/api/RetrieveAllLessonsUseCase";
import { RestLesson } from "../api/entity/RestLesson";
import { RestLessonPart } from "../api/entity/RestLessonPart";

export class RetrieveAllLessonsRoute {
    private readonly useCase: RetrieveAllLessonsUseCase;

    constructor(useCase: RetrieveAllLessonsUseCase) {
        this.useCase = useCase;
    }

    retrieve(req: Request, res: Response): void {
        try {
            const interactorResponse = this.useCase.retrieve();
            const restResponse = interactorResponse.map(element => this.convertB2R(element));
            res.status(200).json(restResponse);
        } catch (e) {
            const err = e as Error;
            res.status(500).json(err.message);
        }
    }

    private convertB2R(lesson: BoundaryLesson): RestLesson {
        const convertedLessonParts = lesson.getParts().map(part => this.convertLessonPartToRest(part))
        return new RestLesson(lesson.getName(), lesson.getGoal(), convertedLessonParts);
    }

    private convertLessonPartToRest(part: BoundaryLessonPart): RestLessonPart {
        return new RestLessonPart(part.getPartName(), Object.fromEntries(part.getPartSubtopics()));
    }
}