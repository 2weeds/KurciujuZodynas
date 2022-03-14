/* eslint-disable no-restricted-imports */
import { Box } from "@mui/material";
import React, { useState } from "react";
import { PageHeader } from "../../components/PageHeader";
import { PageTitle } from "../../components/PageTitle";
import { LandingWindow } from "../landing-window/LandingWindow";
import { LexiconWindow } from "../lexicon-window/LexiconWindow";
import { PhrasesWindow } from "../phrases-window/PhrasesWindow";

export const MainWindow = () => {
  const [page, setPage] = useState<string>("landing");

  return page === "landing" ? (
    <Box>
        <PageHeader pageSetter={setPage} />
        <PageTitle />
        <LandingWindow pageSetter={setPage} />
    </Box>
  ) : page === "lexicon" ? (
      <Box>
        <PageHeader pageSetter={setPage} />
        <PageTitle />
        <LexiconWindow pageSetter={setPage} />
      </Box>
  ) : (
    <Box>
      <PageHeader pageSetter={setPage} />
      <PageTitle />
      <PhrasesWindow pageSetter={setPage} />
    </Box>
  );
};