/* eslint-disable no-restricted-imports */
import { Box } from "@mui/material";
import React, { useState } from "react";
import { PageHeader } from "../../components/PageHeader";
import { PageTitle } from "../../components/PageTitle";
import { LandingWindow } from "../landing-window/LandingWindow";
import { LexiconWindow } from "../lexicon-window/LexiconWindow";
import { PhrasesWindow } from "../phrases-window/PhrasesWindow";
import { LessonWindow } from "../lesson-window/LessonWindow";
import { AdminWindow } from "../admin-window/AdminWindow";
import { ViewAdminResponse } from "../../../controller/model/ViewAdminResponse";

export const MainWindow = () => {
  const [page, setPage] = useState<string>("landing");
  const [token, setToken] = useState<ViewAdminResponse | undefined>(undefined);

  const renderHeader = () => {
    return token === undefined ? <PageHeader pageSetter={setPage} type="user" /> : <PageHeader pageSetter={setPage} type="admin" />
  }

  return page === "landing" ? (
    <Box>
        {renderHeader()}
        <PageTitle pageType="user" />
        <LandingWindow pageSetter={setPage} />
    </Box>
  ) : page === "lexicon" ? (
      <Box>
        {renderHeader()}
        <PageTitle pageType="user" />
        <LexiconWindow pageSetter={setPage} />
      </Box>
  ) : page === "phrases" ? (
    <Box>
      {renderHeader()}
      <PageTitle pageType="user" />
      <PhrasesWindow pageSetter={setPage} />
    </Box>
  ) : page === "lesson" ? (
    <Box>
      {renderHeader()}
      <PageTitle pageType="user" />
      <LessonWindow pageSetter={setPage} />
    </Box>
  ) : (
    <Box>
    {renderHeader()}
    <PageTitle pageType="admin" />
    <AdminWindow setToken={setToken} token={token} page={page} pageSetter={setPage} />
  </Box>
  );
};