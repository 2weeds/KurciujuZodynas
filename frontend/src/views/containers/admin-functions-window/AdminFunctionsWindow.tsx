import React from "react";
import { ViewAdminResponse } from "../../../controller/model/ViewAdminResponse";
import { AdminAdditionWindow } from "../admin-addition-window/AdminAdditionWindow";
import {AdminExportationWindow} from "../admin-exportation-window/AdminExportationWindow";
import {AdminExportLexiconWindow} from "../admin-exportation-window/AdminExportLexiconWindow";
import {AdminExportPhraseWindow} from "../admin-exportation-window/AdminExportPhraseWindow";

interface Props {
token: ViewAdminResponse | undefined
  page: string
  pageSetter: (type: string) => void;
}

export const AdminFunctionsWindow = ({token, page, pageSetter}: Props) => {
    const renderWindow = () => {
      if(page === "exportation"){
        return  <AdminExportationWindow token={token} page={page} pageSetter={pageSetter} />
      }
      else if (page ==="exportLexicon"){
      return <AdminExportLexiconWindow page={page} pageSetter={pageSetter} token={token}/>
      }
      else if (page ==="exportPhrase"){
        return <AdminExportPhraseWindow page={page} pageSetter={pageSetter} token={token}/>
        }
      else
      return <AdminAdditionWindow page={page} pageSetter={pageSetter} token={token}/>
    }

    return (
        renderWindow()
    )
}
