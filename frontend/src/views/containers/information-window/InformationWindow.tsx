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
    partSetter: (type: ViewLessonPart | undefined) => void;
    lessonSetter: (type: ViewLesson | undefined) => void;
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
        paddingLeft: "2vw",
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
    },

    informationText: {
        overflow: 'auto',
        marginBottom: '3vh'
    }
})

export const InformationWindow = ({ pageSetter, lesson, part, partSetter, lessonSetter }: Props) => {
    const styleClasses = useStyles();

    const transformToLithuanian = (key: string) => {
        if (key === "grammar")
            return "Gramatika";
        else if (key === "lexicon")
            return "Leksika";
        else if (key === "phrases")
            return "Frazės";
        else if (key === "information")
            return "Sociokultūrinė informacija";
        else if (key === 'test')
            return "Užduotis";
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
        if (key === "test")
            pageSetter("test");
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

    const moveBackToDifferentLessonPartIfExists = () => {
        lesson?.parts.forEach((lessonPart, index) => {
            if (part === lessonPart && index === 0) {
                partSetter(undefined);
                pageSetter('landing');
                lessonSetter(undefined);
            } else if (part === lessonPart) {
                const newPart = lesson.parts[index - 1];
                if (newPart.subTopics.has('test')) {
                    pageSetter('test')
                } else if (newPart.subTopics.has('information') && !newPart.subTopics.has('test')) {
                    pageSetter('information');
                } else if (newPart.subTopics.has('grammar') && !newPart.subTopics.has('test') && !newPart.subTopics.has('information')) {
                    pageSetter('grammar');
                } else if (newPart.subTopics.has('phrases') && !newPart.subTopics.has('test') && !newPart.subTopics.has('information') && !newPart.subTopics.has('grammar')) {
                    pageSetter('phrasesSubtopic');
                } else if (newPart.subTopics.has('lexicon') && !newPart.subTopics.has('test') && !newPart.subTopics.has('information') && !newPart.subTopics.has('grammar') && !newPart.subTopics.has('phrases')) {
                    pageSetter('lexiconSubtopic');
                }
                partSetter(newPart);
            }
        })
    }

    const handleBackClick = () => {
        if (part?.subTopics.has('grammar')) {
            pageSetter('grammar');
        } else if (part?.subTopics.has('phrases') && !part?.subTopics.has('grammar')) {
            pageSetter('phrasesSubtopic');
        } else if (part?.subTopics.has('lexicon') && !part?.subTopics.has('grammar') && !part?.subTopics.has('phrases')) {
            pageSetter('lexiconSubtopic');
        } else {
            moveBackToDifferentLessonPartIfExists()
        }
    }

    const moveForwardToDifferentLessonPartIfExists = () => {
        const totalLessonParts = lesson?.parts.length;
        lesson?.parts.forEach((lessonPart, index) => {
            if (part === lessonPart && index === (totalLessonParts! - 1)) {
                partSetter(undefined);
                pageSetter('landing');
                lessonSetter(undefined);
            } else if (part === lessonPart) {
                const newPart = lesson.parts[index + 1];
                if (newPart.subTopics.has('lexicon')) {
                    pageSetter('lexiconSubtopic');
                } else if (newPart.subTopics.has('phrases') && !newPart.subTopics.has('lexicon')) {
                    pageSetter('phrasesSubtopic');
                } else if (newPart.subTopics.has('grammar') && !newPart.subTopics.has('lexicon') && !newPart.subTopics.has('phrases')) {
                    pageSetter('grammar');
                } else if (newPart.subTopics.has('information') && !newPart.subTopics.has('lexicon') && !newPart.subTopics.has('phrases') && !newPart.subTopics.has('grammar')) {
                    pageSetter('information');
                } else if (newPart.subTopics.has('test') && !newPart.subTopics.has('lexicon') && !newPart.subTopics.has('phrases') && !newPart.subTopics.has('grammar') && !newPart.subTopics.has('information')) {
                    pageSetter('test');
                }
                partSetter(newPart);
            }
        })
    }

    const handleForwardClick = () => {
        if (part?.subTopics.has('test')) {
            pageSetter('test');
        } else {
            moveForwardToDifferentLessonPartIfExists()
        }
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
                        <Typography variant="bookPageTitle"><b>SOCIOKULTŪRINĖ INFORMACIJA</b></Typography>
                        <Divider sx={{paddingTop: '3vh'}} />
                        <Box className={styleClasses.informationText}>
                            <Typography sx={{paddingTop: '3vh', overflowWrap: 'anywhere'}}>{part?.subTopics.get('information').text}</Typography>
                        </Box>
                        <Box className={styleClasses.lessonButtonContainer}>
                            <Button className={styleClasses.lessonButtons} variant="text" onClick={() => handleBackClick()}>Atgal</Button>
                            <Button className={styleClasses.lessonButtons} variant="text" onClick={() => handleForwardClick()}>Pirmyn</Button>
                            <Button className={styleClasses.lessonButtons} variant="text" onClick={() => pageSetter("lesson")}>Į pamoką</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}