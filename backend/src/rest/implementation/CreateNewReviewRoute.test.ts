import { mock, MockProxy } from 'jest-mock-extended';
import { getMockReq, getMockRes } from '@jest-mock/express'
import { CreateNewReviewUseCase } from '../../use_case/api/CreateNewReviewUseCase';
import { CreateNewReviewRoute } from './CreateNewReviewRoute';

describe("Testing create new review route", () => {
    let createNewReviewUC : MockProxy<CreateNewReviewUseCase>;
    let createNewReviewRoute : CreateNewReviewRoute;

    beforeEach(() => {
        createNewReviewUC = mock<CreateNewReviewUseCase>();
        createNewReviewRoute = new CreateNewReviewRoute(createNewReviewUC);
    });
    
    test("Route returns status 200", () => {
        const req = getMockReq();
        const { res } = getMockRes();

        createNewReviewRoute.create(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(201);
    })
})