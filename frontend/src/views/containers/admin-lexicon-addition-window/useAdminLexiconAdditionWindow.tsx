import { CreateNewLexiconUnitController } from "../../../controller/CreateNewLexiconUnitController";
import { useAdminAdditionObserver } from "../observer/useAdminAdditionObserver";

export default function useAdminLexiconAdditionWindow(
  newLexiconUnitCreationController: CreateNewLexiconUnitController,
  ): (word: string, abbreviation: string, file: File, token: string | undefined) => void {
    const observer = useAdminAdditionObserver();
    const add = (word: string, abbreviation: string, file: File, token: string | undefined) => {
      newLexiconUnitCreationController.create(word, abbreviation, file, token).subscribe(observer);
    };
  
    return add;
  }