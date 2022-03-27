import { CreateNewLexiconUnitController } from "../../../controller/CreateNewLexiconUnitController";
import { useAdminAdditionObserver } from "../observer/useAdminAdditionObserver";

export default function useAdminLexiconAdditionWindow(
  newLexiconUnitCreationController: CreateNewLexiconUnitController,
  ): (word: string, abbreviation: string, token: string | undefined) => void {
    const observer = useAdminAdditionObserver();
    const authorize = (word: string, abbreviation: string, token: string | undefined) => {
      newLexiconUnitCreationController.create(word, abbreviation, token).subscribe(observer);
    };
  
    return authorize;
  }