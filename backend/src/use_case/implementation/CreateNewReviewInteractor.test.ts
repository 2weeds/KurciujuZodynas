import { mock, MockProxy } from 'jest-mock-extended';
import { ReviewGateway } from "../../gateway/api/ReviewGateway";
import { CreateNewReviewInteractor } from "./CreateNewReviewInteractor";

describe("Testing create new review interactor", () => {
    let reviewGateway : MockProxy<ReviewGateway>;
    let createNewReviewUC : CreateNewReviewInteractor;

    beforeEach(() => {
        reviewGateway = mock<ReviewGateway>();
        createNewReviewUC = new CreateNewReviewInteractor(reviewGateway);
    });
    
    test("Interactor calls GW function", () => {
        const mockedGWFunction = jest.spyOn(reviewGateway, 'addReview');
        createNewReviewUC.create("test", "test", 2);

        expect(mockedGWFunction).toHaveBeenCalled();
    })
})