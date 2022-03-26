import React from "react";
import { ViewAdminResponse } from "../../../controller/model/ViewAdminResponse";
import { AdminLexiconAdditionWindow } from "../admin-lexicon-addition-window/AdminLexiconAdditionWindow";
import { AdminPhraseAdditionWindow } from "../admin-phrase-addition-window/AdminPhraseAdditionWindow";
import { MainWindow } from "../main-window/MainWindow";

interface Props {
  token: ViewAdminResponse | undefined
  page: string
  pageSetter: (type: string) => void;
}

export const AdminAdditionWindow = ({token, page, pageSetter}: Props) => {

    const renderWindow = () => {
      if (token !== undefined)
        return page !== "phraseAddition" ? <AdminLexiconAdditionWindow /> : <AdminPhraseAdditionWindow />
      else
      {
        pageSetter("admin");
        return <MainWindow />
      }
    }

    return (
        renderWindow()
    )
}