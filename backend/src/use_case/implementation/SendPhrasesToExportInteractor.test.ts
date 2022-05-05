import { mock, MockProxy } from 'jest-mock-extended';
import { PhraseGateway } from '../../gateway/api/PhraseGateway';
import { SendPhrasesToExportInteractor } from './SendPhrasesToExportInteractor';

describe("Testing send phrases to export interactor", () => {
    let phraseGateway : MockProxy<PhraseGateway>;
    let sendPhrasesToExportUC : SendPhrasesToExportInteractor;

    beforeEach(() => {
        phraseGateway = mock<PhraseGateway>();
        sendPhrasesToExportUC = new SendPhrasesToExportInteractor(phraseGateway);
    });
    
    test("Interactor calls GW function", () => {
        const mockedGWFunction = jest.spyOn(phraseGateway, 'sendToExport');
        sendPhrasesToExportUC.send([]);

        expect(mockedGWFunction).toHaveBeenCalled();
    })
})