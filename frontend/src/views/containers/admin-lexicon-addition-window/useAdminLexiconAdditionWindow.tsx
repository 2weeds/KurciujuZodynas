import { CreateNewLexiconUnitController } from "../../../controller/CreateNewLexiconUnitController";
import { useAdminAdditionObserver } from "../observer/useAdminAdditionObserver";

export default function useAdminLexiconAdditionWindow(
  newLexiconUnitCreationController: CreateNewLexiconUnitController,
  ): (word: string, abbreviation: string) => void {
    const observer = useAdminAdditionObserver();
    const authorize = (word: string, abbreviation: string) => {
      newLexiconUnitCreationController.create(word, abbreviation).subscribe(observer);
    };
  
    return authorize;
  }