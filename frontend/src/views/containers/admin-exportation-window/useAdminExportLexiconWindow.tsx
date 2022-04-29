import { SendAllLexiconUnitsController } from "../../../controller/SendAllLexiconUnitsController";
import { LexiconUnit } from "../../../domain/LexiconUnit";

export default function useAdminExportLexiconWindow(
  SendAllLexiconUnitsController: SendAllLexiconUnitsController,
): (lexiconUnitArray: LexiconUnit[]) => void {
  const send = (lexiconUnitArray: LexiconUnit[]) => {
    SendAllLexiconUnitsController.send(lexiconUnitArray).subscribe();

  };
  return send;
}