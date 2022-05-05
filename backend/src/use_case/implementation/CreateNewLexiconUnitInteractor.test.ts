import { LexiconUnitGateway } from "../../gateway/api/LexiconUnitGateway";
import { mock, MockProxy } from 'jest-mock-extended';
import { CreateNewLexiconUnitInteractor } from "./CreateNewLexiconUnitInteractor";

describe("Testing create new lexicon unit interactor", () => {
    let lexiconGateway : MockProxy<LexiconUnitGateway>;
    let createLexiconUnitUC : CreateNewLexiconUnitInteractor;

    beforeEach(() => {
        lexiconGateway = mock<LexiconUnitGateway>();
        createLexiconUnitUC = new CreateNewLexiconUnitInteractor(lexiconGateway);
    });
    
    test("Interactor calls GW function", () => {
        const mockedGWFunction = jest.spyOn(lexiconGateway, 'createUnit');
        createLexiconUnitUC.create("test", "test", null);

        expect(mockedGWFunction).toHaveBeenCalled();
    })
})