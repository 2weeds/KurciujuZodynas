import { mock, MockProxy } from 'jest-mock-extended';
import { getMockReq, getMockRes } from '@jest-mock/express'
import { RetrieveAllReviewsUseCase } from '../../use_case/api/RetrieveAllReviewsUseCase';
import { RetrieveAllReviewsRoute } from './RetrieveAllReviewsRoute';
import { BoundaryReview } from '../../use_case/api/entity/BoundaryReview';
import { RestReview } from '../api/entity/RestReview';

describe("Testing retrieve all reviews route", () => {
    let retrieveReviewsUC : MockProxy<RetrieveAllReviewsUseCase>;
    let retrieveReviewsRoute : RetrieveAllReviewsRoute;

    beforeEach(() => {
        retrieveReviewsUC = mock<RetrieveAllReviewsUseCase>();
        retrieveReviewsRoute = new RetrieveAllReviewsRoute(retrieveReviewsUC);
    });
    
    test("Route calls returns status 200 with data", () => {
        retrieveReviewsUC.retrieve.mockReturnValue(new Array(new BoundaryReview("test", "test", 1)));
        const req = getMockReq();
        const { res } = getMockRes();

        retrieveReviewsRoute.retrieve(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(new Array(new RestReview("test", "test", 1)));
    })

    test("Route should return status 500 in case of an error", () => {
        const req = getMockReq();
        const { res } = getMockRes();

        retrieveReviewsRoute.retrieve(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    })
})