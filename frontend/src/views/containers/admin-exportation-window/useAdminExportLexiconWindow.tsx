import { SendLexiconUnitsToExportController } from "../../../controller/SendLexiconUnitsToExportController";
import { LexiconUnit } from "../../../domain/LexiconUnit";

export default function useAdminExportLexiconWindow(
  SendLexiconUnitsToExportController: SendLexiconUnitsToExportController,
): (lexiconUnitArray: LexiconUnit[]) => void {
  const send = (lexiconUnitArray: LexiconUnit[]) => {
    SendLexiconUnitsToExportController.send(lexiconUnitArray).subscribe();

  };
  return send;
}