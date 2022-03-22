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

export const MainWindow = () => {
  const [page, setPage] = useState<string>("landing");

  return page === "landing" ? (
    <Box>
        <PageHeader pageSetter={setPage} />
        <PageTitle pageType="user" />
        <LandingWindow pageSetter={setPage} />
    </Box>
  ) : page === "lexicon" ? (
      <Box>
        <PageHeader pageSetter={setPage} />
        <PageTitle pageType="user" />
        <LexiconWindow pageSetter={setPage} />
      </Box>
  ) : page === "phrases" ? (
    <Box>
      <PageHeader pageSetter={setPage} />
      <PageTitle pageType="user" />
      <PhrasesWindow pageSetter={setPage} />
    </Box>
  ) : page === "admin" ? (
    <Box>
      <PageHeader pageSetter={setPage} />
      <PageTitle pageType="admin" />
      <AdminWindow />
    </Box>
  ) : (
    <Box>
      <PageHeader pageSetter={setPage} />
      <PageTitle pageType="user" />
      <LessonWindow pageSetter={setPage} />
    </Box>
  );
};