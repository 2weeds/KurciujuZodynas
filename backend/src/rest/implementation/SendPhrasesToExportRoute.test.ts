import { mock, MockProxy } from 'jest-mock-extended';
import { getMockReq, getMockRes } from '@jest-mock/express'
import { SendPhrasesToExportUseCase } from '../../use_case/api/SendPhrasesToExportUseCase';
import { SendPhrasesToExportRoute } from './SendPhrasesToExportRoute';

describe("Testing send phrases to export route", () => {
    let SendPhrasesToExportUC : MockProxy<SendPhrasesToExportUseCase>;
    let sendPhrasesToExportRoute : SendPhrasesToExportRoute;

    beforeEach(() => {
        SendPhrasesToExportUC = mock<SendPhrasesToExportUseCase>();
        sendPhrasesToExportRoute = new SendPhrasesToExportRoute(SendPhrasesToExportUC);
    });
    
    test("Route returns status 200", () => {
        const req = getMockReq();
        const { res } = getMockRes();

        sendPhrasesToExportRoute.send(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(201);
    })
})