import { Request, Response } from "express";
import { CreateNewReviewUseCase } from "../../use_case/api/CreateNewReviewUseCase";

export class CreateNewReviewRoute {
    private readonly useCase: CreateNewReviewUseCase;

    constructor(useCase: CreateNewReviewUseCase) {
        this.useCase = useCase;
    }
    
    create(req: Request, res: Response): void {
        try {
            const body = req.body;
            this.useCase.create(body.name, body.reviewText, body.rating);
            res.sendStatus(201);
        } catch (e) {
            const err = e as Error;
            res.status(400).json(err.message);
        }
    }
}