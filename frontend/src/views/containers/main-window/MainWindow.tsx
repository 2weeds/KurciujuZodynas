import { Box, Button, AppBar, Typography } from "@mui/material";
import React, { useState } from "react";
import { LandingWindow } from "../landing-window/LandingWindow";
import { LexiconWindow } from "../lexicon-window/LexiconWindow";
import { PhrasesWindow } from "../phrases-window/PhrasesWindow";
import { LessonWindow } from "../lesson-window/LessonWindow";
import { ClientWindow } from "../client-window/ClientWindow";
import { ViewLesson } from "../../../controller/model/ViewLesson";
import { GrammarWindow } from "../grammar-window/GrammarWindow";
import { ViewLessonPart } from "../../../controller/model/ViewLessonPart";
import { LexiconSubtopicWindow } from "../lexicon-subtopic-window/LexiconSubtopicWindow";
import { PhrasesSubtopicWindow } from "../phrases-subtopic-window/PhrasesSubtopicWindow";
import { InformationWindow } from "../information-window/InformationWindow";
import { TestWindow } from "../test-window/TestWindow";
import { ReviewWindow} from "../review-window/ReviewWindow";

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
const registrationAppBarButton = {
  fontSize: "11px",
  fontWeight: 100,
  color: 'white',
  backgroundColor:'#2196f3',
  '&:hover': {
    backgroundColor: '#57a9eb',
    color:'black',
    '&:active': {
        backgroundColor: '#57a9eb',
    }
}
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
  const [lessonToDisplay, setLessonToDisplay] = useState<ViewLesson | undefined>(undefined);
  const [partToDisplay, setPartToDisplay] = useState<ViewLessonPart | undefined>(undefined);
  const [userType, setUserType]= useState<string|undefined>(undefined);

  const renderClientButtons = () => {
    if (token !== undefined)
        return (
        <Box>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("lexiconAddition")}>Leksikos pridėjimas</Button>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("phraseAddition")}>Frazių pridėjimas</Button>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("lessonAddition")}>Pamokų pridėjimas</Button>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("exportation")}>Eksportavimas</Button>
        </Box> )
    else if (token !== undefined&& userType==='user')
        return (
        <Box>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("review")}>Atsiliepimai</Button>
        </Box>
        )
    else 
        return (<Box>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("admin")}>Administracija</Button>
          </Box>)
}

  return page === "landing" ? (
    <Box>
      <AppBar sx={appBar}>
        <Box sx={adminButtonsBox}>
          {renderClientButtons()}
        </Box>
        <Box sx={userButtonsBox}>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("reviews")}>Atsiliepimai</Button>
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
      <LandingWindow pageSetter={setPage} lessonSetter={setLessonToDisplay} />
    </Box>
  ) : page === "lexicon" ? (
      <Box>
        <AppBar sx={appBar}>
          <Box sx={adminButtonsBox}>
            {renderClientButtons()}
          </Box>
          <Box sx={userButtonsBox}>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("reviews")}>Atsiliepimai</Button>
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
          {renderClientButtons()}
        </Box>
        <Box sx={userButtonsBox}>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("reviews")}>Atsiliepimai</Button>
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
  ) : page === "reviews" ? (
    <Box>
      <AppBar sx={appBar}>
        <Box sx={adminButtonsBox}>
          {renderClientButtons()}
        </Box>
        <Box sx={userButtonsBox}>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("reviews")}>Atsiliepimai</Button>
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
      <ReviewWindow pageSetter={setPage} />
    </Box>
    ) : page === "lesson" ? (
    <Box>
      <AppBar sx={appBar}>
        <Box sx={adminButtonsBox}>
          {renderClientButtons()}
        </Box>
        <Box sx={userButtonsBox}>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("reviews")}>Atsiliepimai</Button>
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
      <LessonWindow pageSetter={setPage} lessonToDisplay={lessonToDisplay} partSetter={setPartToDisplay} />
    </Box>
  ) : page === "grammar" ? (
    <Box>
        <AppBar sx={appBar}>
          <Box sx={adminButtonsBox}>
            {renderClientButtons()}
          </Box>
          <Box sx={userButtonsBox}>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("reviews")}>Atsiliepimai</Button>
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
        <GrammarWindow pageSetter={setPage} lesson={lessonToDisplay} part={partToDisplay} partSetter={setPartToDisplay} lessonSetter={setLessonToDisplay} />
      </Box>
  ) : page === "information" ? (
    <Box>
        <AppBar sx={appBar}>
          <Box sx={adminButtonsBox}>
            {renderClientButtons()}
          </Box>
          <Box sx={userButtonsBox}>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("reviews")}>Atsiliepimai</Button>
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
        <InformationWindow pageSetter={setPage} lesson={lessonToDisplay} part={partToDisplay} partSetter={setPartToDisplay} lessonSetter={setLessonToDisplay} />
      </Box>
  ) : page === "test" ? (
    <Box>
        <AppBar sx={appBar}>
          <Box sx={adminButtonsBox}>
            {renderClientButtons()}
          </Box>
          <Box sx={userButtonsBox}>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("reviews")}>Atsiliepimai</Button>
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
        <TestWindow pageSetter={setPage} lesson={lessonToDisplay} part={partToDisplay} partSetter={setPartToDisplay} lessonSetter={setLessonToDisplay} />
      </Box>
  ) : page === "lexiconSubtopic" ? (
    <Box>
        <AppBar sx={appBar}>
          <Box sx={adminButtonsBox}>
            {renderClientButtons()}
          </Box>
          <Box sx={userButtonsBox}>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("reviews")}>Atsiliepimai</Button>
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
        <LexiconSubtopicWindow pageSetter={setPage} lesson={lessonToDisplay} part={partToDisplay} partSetter={setPartToDisplay} lessonSetter={setLessonToDisplay} />
      </Box>
  ) : page === "phrasesSubtopic" ? (
    <Box>
        <AppBar sx={appBar}>
          <Box sx={adminButtonsBox}>
            {renderClientButtons()}
          </Box>
          <Box sx={userButtonsBox}>
            <Button sx={appBarButton} variant="text" onClick={() => setPage("reviews")}>Atsiliepimai</Button>
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
        <PhrasesSubtopicWindow pageSetter={setPage} lesson={lessonToDisplay} part={partToDisplay} partSetter={setPartToDisplay} lessonSetter={setLessonToDisplay} />
      </Box>
  ) : (
    <Box>
      <AppBar sx={appBar}>
        <Box sx={adminButtonsBox}>
          {renderClientButtons()}
        </Box>
        <Box sx={userButtonsBox}>
          <Button sx={appBarButton} variant="text" onClick={() => setPage("reviews")}>Atsiliepimai</Button>
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
      <ClientWindow setToken={setToken} token={token} page={page}  pageSetter={setPage} setUserType={setUserType} userType={userType}/>
  </Box>
  );
};