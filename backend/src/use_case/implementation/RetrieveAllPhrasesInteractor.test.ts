import { mock, MockProxy } from 'jest-mock-extended';
import { Phrase } from '../../domain/Phrase';
import { PhraseGateway } from '../../gateway/api/PhraseGateway';
import { RetrieveAllPhrasesInteractor } from './RetrieveAllPhrasesInteractor';

describe("Testing retrieve all phrases interactor", () => {
    let phrasesGateway : MockProxy<PhraseGateway>;
    let retrievePhrasesUC : RetrieveAllPhrasesInteractor;

    beforeEach(() => {
        phrasesGateway = mock<PhraseGateway>();
        retrievePhrasesUC = new RetrieveAllPhrasesInteractor(phrasesGateway);
    });
    
    test("Interactor calls GW function", () => {
        phrasesGateway.retrieveAll.mockReturnValue(new Array(new Phrase("test", null)));

        expect(retrievePhrasesUC.retrieve()).toHaveLength(1);
    })
})