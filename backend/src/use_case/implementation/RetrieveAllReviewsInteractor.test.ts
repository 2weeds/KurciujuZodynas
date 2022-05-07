import { mock, MockProxy } from 'jest-mock-extended';
import { Review } from '../../domain/Review';
import { ReviewGateway } from '../../gateway/api/ReviewGateway';
import { BoundaryReview } from '../api/entity/BoundaryReview';
import { RetrieveAllReviewsInteractor } from './RetrieveAllReviewsInteractor';

describe("Testing retrieve all reviews interactor", () => {
    let reviewGateway : MockProxy<ReviewGateway>;
    let retrieveReviewsUC : RetrieveAllReviewsInteractor;

    beforeEach(() => {
        reviewGateway = mock<ReviewGateway>();
        retrieveReviewsUC = new RetrieveAllReviewsInteractor(reviewGateway);
    });
    
    test("Interactor calls GW function", () => {
        reviewGateway.retrieveAll.mockReturnValue(new Array(new Review("test", "test", 2)));

        expect(retrieveReviewsUC.retrieve()).toHaveLength(1);
    })

    test("Interactor converts the value", () => {
        reviewGateway.retrieveAll.mockReturnValue(new Array(new Review("test", "test", 2)));

        const response = retrieveReviewsUC.retrieve();
        expect(response).toHaveLength(1);
        expect(response[0]).toBeInstanceOf(BoundaryReview);
    
    })
})