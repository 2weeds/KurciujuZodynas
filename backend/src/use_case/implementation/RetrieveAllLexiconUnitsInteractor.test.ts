import { mock, MockProxy } from 'jest-mock-extended';
import { LexiconUnit } from '../../domain/LexiconUnit';
import { LexiconUnitGateway } from '../../gateway/api/LexiconUnitGateway';
import { BoundaryLexiconUnit } from '../api/entity/BoundaryLexiconUnit';
import { RetrieveAllLexiconUnitsInteractor } from './RetrieveAllLexiconUnitsInteractor';

describe("Testing retrieve all lexicon units interactor", () => {
    let lexiconGateway : MockProxy<LexiconUnitGateway>;
    let retrieveLexiconUnitsUC : RetrieveAllLexiconUnitsInteractor;

    beforeEach(() => {
        lexiconGateway = mock<LexiconUnitGateway>();
        retrieveLexiconUnitsUC = new RetrieveAllLexiconUnitsInteractor(lexiconGateway);
    });
    
    test("Interactor calls GW function", () => {
        lexiconGateway.retrieveAll.mockReturnValue(new Array(new LexiconUnit("test", "test", null)));

        expect(retrieveLexiconUnitsUC.retrieve()).toHaveLength(1);
    })

    test("Interactor converts the value", () => {
        lexiconGateway.retrieveAll.mockReturnValue(new Array(new LexiconUnit("test", "test", null)));

        const response = retrieveLexiconUnitsUC.retrieve();
        expect(response).toHaveLength(1);
        expect(response[0]).toBeInstanceOf(BoundaryLexiconUnit);
    
    })
})