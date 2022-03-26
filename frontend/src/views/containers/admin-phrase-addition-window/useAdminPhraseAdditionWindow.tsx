import { CreateNewPhraseController } from "../../../controller/CreateNewPhraseController";
import { useAdminAdditionObserver } from "../observer/useAdminAdditionObserver";

export default function useAdminPhraseAdditionWindow(
  newPhraseCreationController: CreateNewPhraseController,
  ): (phrase: string) => void {
    const observer = useAdminAdditionObserver();
    const authorize = (phrase: string) => {
      newPhraseCreationController.create(phrase).subscribe(observer);
    };
  
    return authorize;
  }