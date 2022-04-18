import React from "react";
import { AdminLessonAdditionWindow } from "../admin-lesson-addition-window/AdminLessonAdditionWindow";
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
        return page === "lessonAddition" ? <AdminLessonAdditionWindow token={token} /> : page === "phraseAddition" ? <AdminPhraseAdditionWindow token={token} /> : <AdminLexiconAdditionWindow token={token} />
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