import { mock, MockProxy } from 'jest-mock-extended';
import { getMockReq, getMockRes } from '@jest-mock/express'
import { RetrieveAllLexiconUnitsUseCase } from '../../use_case/api/RetrieveAllLexiconUnitsUseCase';
import { RetrieveAllLexiconUnitsRoute } from './RetrieveAllLexiconUnitsRoute';
import { BoundaryLexiconUnit } from '../../use_case/api/entity/BoundaryLexiconUnit';
import { RestLexiconUnit } from '../api/entity/RestLexiconUnit';

describe("Testing retrieve all lexicon units route", () => {
    let retrieveLexiconUnitsUC : MockProxy<RetrieveAllLexiconUnitsUseCase>;
    let retrieveLexiconUnitsRoute : RetrieveAllLexiconUnitsRoute;

    beforeEach(() => {
        retrieveLexiconUnitsUC = mock<RetrieveAllLexiconUnitsUseCase>();
        retrieveLexiconUnitsRoute = new RetrieveAllLexiconUnitsRoute(retrieveLexiconUnitsUC);
    });
    
    test("Route returns status 200 with data", () => {
        retrieveLexiconUnitsUC.retrieve.mockReturnValue(new Array(new BoundaryLexiconUnit("test", "test", null)));
        const req = getMockReq();
        const { res } = getMockRes();

        retrieveLexiconUnitsRoute.retrieve(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(new Array(new RestLexiconUnit("test", "test", null)));
    })

    test("Route should return status 500 in case of an error", () => {
        const req = getMockReq();
        const { res } = getMockRes();

        retrieveLexiconUnitsRoute.retrieve(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    })
})