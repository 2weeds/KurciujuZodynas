import { Request, Response } from "express";
import { CreateNewLessonUseCase } from "../../use_case/api/CreateNewLessonUseCase";
import { BoundaryLesson } from "../../use_case/api/entity/BoundaryLesson";
import { BoundaryLessonPart } from "../../use_case/api/entity/BoundaryLessonPart";
import { tokenDecoder } from '../tokenDecoder';

export class CreateNewLessonRoute {
    private readonly useCase: CreateNewLessonUseCase;

    constructor(useCase: CreateNewLessonUseCase) {
        this.useCase = useCase;
    }

    async create(req: Request, res: Response): Promise<void> {
        const data = req.body;
        const headers = req.headers;
        try {
            if (await tokenDecoder(headers.authorization)) {
                const boundaryLessonParts: BoundaryLessonPart[] = data.lesson.parts.map((part: any) => new BoundaryLessonPart(part.name, new Map(Object.entries(part.subTopics))))
                this.useCase.create(new BoundaryLesson(data.lesson.name, data.lesson.goal, boundaryLessonParts));
            } else {
                res.status(400).json("Unauthorized");
            }
        } catch (e) {
            const err = e as Error;
            res.status(400).json(err.message);
        }
    }
}