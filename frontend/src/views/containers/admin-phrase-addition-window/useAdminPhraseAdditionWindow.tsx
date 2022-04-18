import { CreateNewPhraseController } from "../../../controller/CreateNewPhraseController";
import { useAdminAdditionObserver } from "../observer/useAdminAdditionObserver";

export default function useAdminPhraseAdditionWindow(
  newPhraseCreationController: CreateNewPhraseController,
  ): (phrase: string, file: File, token: string | undefined) => void {
    const observer = useAdminAdditionObserver();
    const add = (phrase: string, file: File, token: string | undefined) => {
      newPhraseCreationController.create(phrase, file, token).subscribe(observer);
    };
  
    return add;
  }