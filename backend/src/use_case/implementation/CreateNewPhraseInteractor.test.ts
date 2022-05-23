import { PhraseGateway } from "../../gateway/api/PhraseGateway";
import { mock, MockProxy } from 'jest-mock-extended';
import { CreateNewPhraseInteractor } from "./CreateNewPhraseInteractor";

describe("Testing create new phrase interactor", () => {
    let phraseGateway : MockProxy<PhraseGateway>;
    let createNewPhraseUC : CreateNewPhraseInteractor;

    beforeEach(() => {
        phraseGateway = mock<PhraseGateway>();
        createNewPhraseUC = new CreateNewPhraseInteractor(phraseGateway);
    });
    
    test("Interactor calls GW function", () => {
        const mockedGWFunction = jest.spyOn(phraseGateway, 'createPhrase');
        createNewPhraseUC.create("test", null);

        expect(mockedGWFunction).toHaveBeenCalled();
    })
})