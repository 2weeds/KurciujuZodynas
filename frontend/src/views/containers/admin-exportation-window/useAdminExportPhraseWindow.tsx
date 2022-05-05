import { SendPhrasesToExportController } from "../../../controller/SendPhrasesToExportController";
import { Phrase } from "../../../domain/Phrase";

export default function useAdminExportLexiconWindow(
  SendPhrasesToExportController: SendPhrasesToExportController,
): (phrasesArray: Phrase[]) => void {
  const send = (phrasesArray: Phrase[]) => {
    SendPhrasesToExportController.send(phrasesArray).subscribe();

  };
  return send;
}