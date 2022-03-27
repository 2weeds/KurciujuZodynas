import React from "react";
import { AdminLexiconAdditionWindow } from "../admin-lexicon-addition-window/AdminLexiconAdditionWindow";
import { AdminPhraseAdditionWindow } from "../admin-phrase-addition-window/AdminPhraseAdditionWindow";
import { MainWindow } from "../main-window/MainWindow";

interface Props {
  token: string | undefined
  page: string
  pageSetter: (type: string) => void;
}

export const AdminAdditionWindow = ({token, page, pageSetter}: Props) => {

    const renderWindow = () => {
      if (token !== undefined)
        return page !== "phraseAddition" ? <AdminLexiconAdditionWindow token={token} /> : <AdminPhraseAdditionWindow token={token} />
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