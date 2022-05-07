import { mock, MockProxy } from 'jest-mock-extended';
import { getMockReq, getMockRes } from '@jest-mock/express'
import { SendLexiconUnitsToExportRoute } from './SendLexiconUnitsToExportRoute';
import { SendLexiconUnitsToExportUseCase } from '../../use_case/api/SendLexiconUnitsToExportUseCase';

describe("Testing send lexicon units to export route", () => {
    let sendLexiconUnitsToExportUC : MockProxy<SendLexiconUnitsToExportUseCase>;
    let sendLexiconUnitsToExportRoute : SendLexiconUnitsToExportRoute;

    beforeEach(() => {
        sendLexiconUnitsToExportUC = mock<SendLexiconUnitsToExportUseCase>();
        sendLexiconUnitsToExportRoute = new SendLexiconUnitsToExportRoute(sendLexiconUnitsToExportUC);
    });
    
    test("Route returns status 200", () => {
        const req = getMockReq();
        const { res } = getMockRes();

        sendLexiconUnitsToExportRoute.send(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(201);
    })
})