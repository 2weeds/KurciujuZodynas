import { Box, Typography, List, ListItem, Button, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React from "react";
import { ViewLesson } from "../../../controller/model/ViewLesson";
import { ViewLessonPart } from "../../../controller/model/ViewLessonPart";

interface Props {
    pageSetter: (type: string) => void;
    lesson: ViewLesson | undefined;
    part: ViewLessonPart | undefined;
}

const useStyles = makeStyles({
    formContainer: {
        paddingTop: "3vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    form: {
        width: "60vw",
        height: "80vh",
        background: "#fff",
        display: "flex",
        flexDirection: "row",
    },

    sides: {
        marginTop: "3vh",
        marginBottom: "3vh",
        padding: "5vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "6px 6px 5px 0px #908C93",
    },

    leftSide: {
        marginLeft: "2vw",
        background: "linear-gradient(90deg, #2196f3 90%, #08569B 100%)",
        color: "#EBEBEB",
        borderTop: "1px solid #074E88",
        borderBottom: "1px solid #074E88",
        borderLeft: "1px solid #074E88",
        width: "20%",
    },

    rightSide: {
        marginRight: "2vw",
        background: "linear-gradient(90deg, #A3A3A3 0%, #EBEBEB 10%)",
        borderTop: "1px solid #8F8F8F",
        borderBottom: "1px solid #8F8F8F",
        borderRight: "1px solid #8F8F8F",
        width: "70%",
        position: 'relative'
    },

    searchField: {
        marginTop: "2vh",
        width: "15vw",
        "& label.Mui-focused": {
            color: "black"
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "black"
            }
          }
    },

    list: {
        paddingTop: "2vh",
        paddingLeft: "3vw",
        listStyle: "disc",
    },

    listItem: {
        display: "list-item"
    },

    listItemButton: {
        paddingTop: "2px",
        paddingBottom: "2px",
        fontWeight: 600,
        fontSize: "11px",
        "&:hover": {
            paddingLeft: "0vw",
            background: "#2196f3"
        }
    },

    playButton: {
        color: 'green',
        fontSize: '36px',
    },

    lessonButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: '3vh',
        right: '35%'
    },

    lessonButtons: {
        color: 'black',
        fontWeight: 600,
        fontSize: "13px",
        "&:hover": {
            background: "#D5D7D7"
        }
    }
})

export const GrammarWindow = ({ pageSetter, lesson, part }: Props) => {
    const styleClasses = useStyles();

    const transformToLithuanian = (key: string) => {
        if (key === "grammar")
            return "Gramatika";
        else if (key === "lexicon")
            return "Leksika";
        else if (key === "phrases")
            return "Frazės";
        else if (key === "information")
            return "Socialinė informacija";
    }

    const handleOnClick = (key: string) => {
        if (key === "lexicon")
            pageSetter("lexiconSubtopic");
        if (key === "phrases")
            pageSetter("phrasesSubtopic");
        if (key === "grammar")
            pageSetter("grammar");
        if (key === "information")
            pageSetter("information");
    }

    const renderLessonPartSubtopics = () => {
        return (
            Array.from(part!.subTopics).map((arrayObject: any) => (
                <ListItem className={styleClasses.listItem}>
                    <Button className={styleClasses.listItemButton} onClick={() => handleOnClick(arrayObject[0])}>{transformToLithuanian(arrayObject[0])}</Button>
                </ListItem>
            ))
        )
    }

    return (
        <Box>
            <Box className={styleClasses.formContainer}>
                <Box className={styleClasses.form}>
                    <Box className={clsx(styleClasses.sides, styleClasses.leftSide)}>
                        <Typography variant="bookPageTitle">Dalies informacinė struktūra:</Typography>
                        <List className={styleClasses.list}>
                            {renderLessonPartSubtopics()}
                        </List>
                    </Box>
                    <Box className={clsx(styleClasses.sides, styleClasses.rightSide)}>
                        <Typography variant="bookPageTitle"><b>GRAMATIKA</b></Typography>
                        <Divider sx={{paddingTop: '3vh'}} />
                        <Typography sx={{paddingTop: '3vh'}}>{part?.subTopics.get('grammar').text}</Typography>
                        <Box className={styleClasses.lessonButtonContainer}>
                            <Button className={styleClasses.lessonButtons} variant="text">Atgal</Button>
                            <Button className={styleClasses.lessonButtons} variant="text">Pirmyn</Button>
                            <Button className={styleClasses.lessonButtons} variant="text" onClick={() => pageSetter("lesson")}>Į pamoką</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}