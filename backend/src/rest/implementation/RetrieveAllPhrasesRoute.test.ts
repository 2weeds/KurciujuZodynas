import { mock, MockProxy } from 'jest-mock-extended';
import { getMockReq, getMockRes } from '@jest-mock/express'
import { RetrieveAllPhrasesUseCase } from '../../use_case/api/RetrieveAllPhrasesUseCase';
import { RetrieveAllPhrasesRoute } from './RetrieveAllPhrasesRoute';
import { BoundaryPhrase } from '../../use_case/api/entity/BoundaryPhrase';
import { RestPhrase } from '../api/entity/RestPhrase';

describe("Testing retrieve all phrases route", () => {
    let retrievePhrasesUC : MockProxy<RetrieveAllPhrasesUseCase>;
    let retrievePhrasesRoute : RetrieveAllPhrasesRoute;

    beforeEach(() => {
        retrievePhrasesUC = mock<RetrieveAllPhrasesUseCase>();
        retrievePhrasesRoute = new RetrieveAllPhrasesRoute(retrievePhrasesUC);
    });
    
    test("Route returns status 200 with data", () => {
        retrievePhrasesUC.retrieve.mockReturnValue(new Array(new BoundaryPhrase("test", null)));
        const req = getMockReq();
        const { res } = getMockRes();

        retrievePhrasesRoute.retrieve(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(new Array(new RestPhrase("test", null)));
    })

    test("Route should return status 500 in case of an error", () => {
        const req = getMockReq();
        const { res } = getMockRes();

        retrievePhrasesRoute.retrieve(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    })
})