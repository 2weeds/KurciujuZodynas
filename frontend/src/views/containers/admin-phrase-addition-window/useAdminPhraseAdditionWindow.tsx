import { CreateNewPhraseController } from "../../../controller/CreateNewPhraseController";
import { useAdminAdditionObserver } from "../observer/useAdminAdditionObserver";

export default function useAdminPhraseAdditionWindow(
  newPhraseCreationController: CreateNewPhraseController,
  ): (phrase: string, token: string | undefined) => void {
    const observer = useAdminAdditionObserver();
    const add = (phrase: string, token: string | undefined) => {
      newPhraseCreationController.create(phrase, token).subscribe(observer);
    };
  
    return add;
  }