import { mock, MockProxy } from 'jest-mock-extended';
import { LessonGateway } from "../../gateway/api/LessonGateway";
import { CreateNewLessonInteractor } from "./CreateNewLessonInteractor";
import { BoundaryLesson } from "../api/entity/BoundaryLesson";

describe("Testing create new lesson interactor", () => {
    let lessonGateway : MockProxy<LessonGateway>;
    let createNewLessonUC : CreateNewLessonInteractor;

    beforeEach(() => {
        lessonGateway = mock<LessonGateway>();
        createNewLessonUC = new CreateNewLessonInteractor(lessonGateway);
    });
    
    test("Interactor calls GW function", () => {
        const mockedGWFunction = jest.spyOn(lessonGateway, 'createLesson');
        createNewLessonUC.create(new BoundaryLesson("test", "test", []));

        expect(mockedGWFunction).toHaveBeenCalled();
    })
})