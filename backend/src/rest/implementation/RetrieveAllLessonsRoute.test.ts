import { mock, MockProxy } from 'jest-mock-extended';
import { BoundaryLesson } from '../../use_case/api/entity/BoundaryLesson';
import { RetrieveAllLessonsUseCase } from '../../use_case/api/RetrieveAllLessonsUseCase';
import { RestLesson } from '../api/entity/RestLesson';
import { RetrieveAllLessonsRoute } from './RetrieveAllLessonsRoute';
import { getMockReq, getMockRes } from '@jest-mock/express'

describe("Testing retrieve all lessons route", () => {
    let retrieveLessonsUC : MockProxy<RetrieveAllLessonsUseCase>;
    let retrieveLessonsRoute : RetrieveAllLessonsRoute;

    beforeEach(() => {
        retrieveLessonsUC = mock<RetrieveAllLessonsUseCase>();
        retrieveLessonsRoute = new RetrieveAllLessonsRoute(retrieveLessonsUC);
    });
    
    test("Route returns status 200 with data", () => {
        retrieveLessonsUC.retrieve.mockReturnValue(new Array(new BoundaryLesson("test", "test", [])));
        const req = getMockReq();
        const { res } = getMockRes();

        retrieveLessonsRoute.retrieve(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(new Array(new RestLesson("test", "test", [])));
    })

    test("Route should return status 500 in case of an error", () => {
        const req = getMockReq();
        const { res } = getMockRes();

        retrieveLessonsRoute.retrieve(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    })
})