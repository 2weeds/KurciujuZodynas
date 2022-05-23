import { mock, MockProxy } from 'jest-mock-extended';
import { LexiconUnitGateway } from '../../gateway/api/LexiconUnitGateway';
import { SendLexiconUnitsToExportInteractor } from './SendLexiconUnitsToExportInteractor';

describe("Testing send lexicon units to export interactor", () => {
    let lexiconGateway : MockProxy<LexiconUnitGateway>;
    let sendLexiconUnitsToExportUC : SendLexiconUnitsToExportInteractor;

    beforeEach(() => {
        lexiconGateway = mock<LexiconUnitGateway>();
        sendLexiconUnitsToExportUC = new SendLexiconUnitsToExportInteractor(lexiconGateway);
    });
    
    test("Interactor calls GW function", () => {
        const mockedGWFunction = jest.spyOn(lexiconGateway, 'sendToExport');
        sendLexiconUnitsToExportUC.send([]);

        expect(mockedGWFunction).toHaveBeenCalled();
    })
})