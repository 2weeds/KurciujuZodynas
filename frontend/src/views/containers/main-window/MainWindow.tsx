import { Box, Button, AppBar, Typography } from "@mui/material";
import React, { useState } from "react";
import { LandingWindow } from "../landing-window/LandingWindow";
import { LexiconWindow } from "../lexicon-window/LexiconWindow";
import { PhrasesWindow } from "../phrases-window/PhrasesWindow";
import { LessonWindow } from "../lesson-window/LessonWindow";
import { AdminWindow } from "../admin-window/AdminWindow";
import { setSourceMapRange } from "typescript";

const appBar = {
  position: "static",
  display: "flex",
  flexDirection: "row"
}

const adminButtonsBox = {
  display: "flex",
  paddingLeft: "1vw",
  width: "50%",
  justifyContent: "flex-start",
}

const userButtonsBox = {
  display: "flex",
  flexDirection: "row",
  paddingRight: "20vw",
  width: "50%",
  justifyContent: "flex-end",
}

const appBarButton = {
  fontSize: "11px",
  fontWeight: 100,
  color: 'black',
}

const pageTitle = {
  paddingTop: "3vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

export const MainWindow = () => {
  const [page, setPage] = useState<string>("landing");
  const [token, setToken] = useState<string | undefined>(undefined);

  const renderAdminButtons = () => {
    if (token !== undefined)
        return (
        <Box>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("lexiconAddition")}>Leksikos pridėjimas</Button>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("phraseAddition")}>Frazių pridėjimas</Button>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("exportation")}>Eksportavimas</Button>
        </Box> )
    else
        return <Button sx={appBarButton} variant="text" onClick={() => setPage("admin")}>Administracija</Button>
}

  return page === "landing" ? (
    <Box>
      <AppBar sx={appBar}>
        <Box sx={adminButtonsBox}>
          {renderAdminButtons()}
        </Box>
        <Box sx={userButtonsBox}>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("landing")}>Pradžia</Button>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("lexicon")}>Leksika</Button>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("phrases")}>Frazės</Button>
        </Box>
      </AppBar>
      <Box sx={pageTitle}>
        <Typography variant="pageTitle">
          Kompiuterinė lietuvių gestų kalbos mokymosi programa
        </Typography>
      </Box>
      <LandingWindow pageSetter={setPage} />
    </Box>
  ) : page === "lexicon" ? (
      <Box>
        <AppBar sx={appBar}>
          <Box sx={adminButtonsBox}>
            {renderAdminButtons()}
          </Box>
          <Box sx={userButtonsBox}>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("landing")}>Pradžia</Button>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("lexicon")}>Leksika</Button>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("phrases")}>Frazės</Button>
          </Box>
        </AppBar>
        <Box sx={pageTitle}>
          <Typography variant="pageTitle">
            Kompiuterinė lietuvių gestų kalbos mokymosi programa
          </Typography>
        </Box>
        <LexiconWindow pageSetter={setPage} />
      </Box>
  ) : page === "phrases" ? (
    <Box>
      <AppBar sx={appBar}>
        <Box sx={adminButtonsBox}>
          {renderAdminButtons()}
        </Box>
        <Box sx={userButtonsBox}>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("landing")}>Pradžia</Button>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("lexicon")}>Leksika</Button>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("phrases")}>Frazės</Button>
        </Box>
      </AppBar>
      <Box sx={pageTitle}>
        <Typography variant="pageTitle">
          Kompiuterinė lietuvių gestų kalbos mokymosi programa
        </Typography>
      </Box>
      <PhrasesWindow pageSetter={setPage} />
    </Box>
  ) : page === "lesson" ? (
    <Box>
      <AppBar sx={appBar}>
        <Box sx={adminButtonsBox}>
          {renderAdminButtons()}
        </Box>
        <Box sx={userButtonsBox}>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("landing")}>Pradžia</Button>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("lexicon")}>Leksika</Button>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("phrases")}>Frazės</Button>
        </Box>
      </AppBar>
      <Box sx={pageTitle}>
        <Typography variant="pageTitle">
          Kompiuterinė lietuvių gestų kalbos mokymosi programa
        </Typography>
      </Box>
      <LessonWindow pageSetter={setPage} />
    </Box>
  ) : (
    <Box>
      <AppBar sx={appBar}>
        <Box sx={adminButtonsBox}>
          {renderAdminButtons()}
        </Box>
        <Box sx={userButtonsBox}>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("landing")}>Pradžia</Button>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("lexicon")}>Leksika</Button>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("phrases")}>Frazės</Button>
        </Box>
      </AppBar>
      <Box sx={pageTitle}>
        <Typography variant="pageTitle">
          Lietuvių gestų kalbos mokymosi programos administravimas
        </Typography>
      </Box>
      <AdminWindow setToken={setToken} token={token} page={page} pageSetter={setPage} />
  </Box>
  );
};