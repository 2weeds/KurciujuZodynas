import { mock, MockProxy } from 'jest-mock-extended';
import { Lesson } from '../../domain/Lesson';
import { LessonGateway } from "../../gateway/api/LessonGateway";
import { RetrieveAllLessonsInteractor } from './RetrieveAllLessonsInteractor';

describe("Testing retrieve all lessons interactor", () => {
    let lessonGateway : MockProxy<LessonGateway>;
    let retrieveLessonsUC : RetrieveAllLessonsInteractor;

    beforeEach(() => {
        lessonGateway = mock<LessonGateway>();
        retrieveLessonsUC = new RetrieveAllLessonsInteractor(lessonGateway);
    });
    
    test("Interactor calls GW function", () => {
        lessonGateway.retrieveAll.mockReturnValue(new Array(new Lesson("test", "test", [])));

        expect(retrieveLessonsUC.retrieve()).toHaveLength(1);
    })
})