import { CreateNewLexiconUnitController } from "../../../controller/CreateNewLexiconUnitController";
import { useLexiconAdditionObserver } from "../observer/useLexiconAdditionObserver";

export default function useAdminLexiconAdditionWindow(
  newLexiconUnitCreationController: CreateNewLexiconUnitController,
  ): (username: string, password: string) => void {
    const observer = useLexiconAdditionObserver();
    const authorize = (word: string, abbreviation: string) => {
      newLexiconUnitCreationController.create(word, abbreviation).subscribe(observer);
    };
  
    return authorize;
  }