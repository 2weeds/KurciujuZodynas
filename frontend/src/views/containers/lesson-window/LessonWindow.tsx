import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React from "react";
import { ViewLesson } from "../../../controller/model/ViewLesson";
import { ViewLessonPart } from "../../../controller/model/ViewLessonPart";

interface Props {
    pageSetter: (type: string) => void;
    lessonToDisplay: ViewLesson | undefined;
    partSetter: (type: ViewLessonPart | undefined) => void;
}

const useStyles = makeStyles({
    formBox: {
        paddingTop: "3vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    bookPages: {
        width: "60vw",
        height: "80vh",
        background: "#fff",
        display: "flex",
        flexDirection: "row",
    },

    pages: {
        marginTop: "3vh",
        marginBottom: "3vh",
        padding: "5vh",
        width: "50%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "6px 6px 5px 0px #908C93",
    },

    leftPage: {
        marginLeft: "2vw",
        background: "linear-gradient(90deg, #2196f3 90%, #08569B 100%)",
        color: "#EBEBEB",
        borderTop: "1px solid #074E88",
        borderBottom: "1px solid #074E88",
        borderLeft: "1px solid #074E88",
        boxShadow: "-4px 0px 5px 0px #0A6FC2, -8px 0px 0px 0px #0087FF, -12px 0px 5px 0px #0A6FC2, -16px 0px 0px 0px #0087FF, 0px 6px 5px 0px #908C93",
        overflow: 'auto'
    },

    rightPage: {
        marginRight: "2vw",
        background: "linear-gradient(90deg, #A3A3A3 0%, #EBEBEB 10%)",
        borderTop: "1px solid #8F8F8F",
        borderBottom: "1px solid #8F8F8F",
        borderRight: "1px solid #8F8F8F",
        boxShadow: "4px 0px 5px 0px #B8B8B8, 8px 0px 0px 0px #EBEBEB, 12px 0px 5px 0px #B8B8B8, 16px 0px 0px 0px #EBEBEB, 0px 6px 5px 0px #908C93"
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

    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    submitButton: {
        marginTop: "5vh",
        width: "15vw",
        background: "linear-gradient(45deg, #2196f3 30%, #A9DDD6 90%)",
        color: "#EBEBEB",
        fontWeight: 600,
    },

    lessonGoal: {
        overflowWrap: 'break-word'
    }
})

export const LessonWindow = ({ pageSetter, lessonToDisplay, partSetter }: Props) => {
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
        else if (key === 'test')
            return "Užduotis";
    }

    const renderLessonSubtopic = (part: ViewLessonPart, subtopic: any) => {
        if (subtopic === "grammar") {
            pageSetter("grammar");
            partSetter(part);
        } else if (subtopic === "lexicon") {
            pageSetter("lexiconSubtopic");
            partSetter(part);
        } else if (subtopic === "phrases") {
            pageSetter("phrasesSubtopic");
            partSetter(part);
        } else if (subtopic === "information") {
            pageSetter("information");
            partSetter(part);
        } else if (subtopic === "test") {
            pageSetter("test");
            partSetter(part);
        }
    }

    const renderLessonPartButtons = (part: ViewLessonPart) => {
        return (
            <ListItem className={styleClasses.listItem}>
                <Button className={styleClasses.listItemButton} onClick={() => renderLessonSubtopic(part, Array.from(part.subTopics)[0][0])}>{part.name}</Button>
                <List className={styleClasses.list}>
                    {
                        Array.from(part.subTopics).map((arrayObject: any, index:number) => (
                            <ListItem className={styleClasses.listItem}>
                                <Button id = {"lessonBtn"+ index} className={styleClasses.listItemButton} onClick={() => renderLessonSubtopic(part, arrayObject[0])}>
                                    {transformToLithuanian(arrayObject[0])}
                                </Button>
                            </ListItem>
                        ))
                }
                </List>
            </ListItem>
        )
    }

    if (lessonToDisplay !== undefined)
        return (
            <Box>
                <Box className={styleClasses.formBox}>
                    <Box className={styleClasses.bookPages}>
                        <Box className={clsx(styleClasses.pages, styleClasses.leftPage)}>
                            <Typography variant="bookPageTitle">Pamokos dalių sаrašas - Jei norite pradėti pamoką, kitoje pusėje paspauskite „Pradėti pamoką". Jeigu jau dalyvavote pamokoje ir norite peržiūrėti, paspauskite pasirinktą temą. Baigę uždarykite langą ir pamoką tęskite toliau.:</Typography>
                            <List className={styleClasses.list}>
                                {
                                    lessonToDisplay.parts.map((part: ViewLessonPart, index: number) => (
                                        renderLessonPartButtons(part)
                                    ))
                                }
                            </List>
                        </Box>
                    <Box className={clsx(styleClasses.pages, styleClasses.rightPage)}>
                        <Typography variant="bookPageTitle"><b>{lessonToDisplay.name}</b></Typography>
                        <Box className={styleClasses.lessonGoal}>
                            <Typography pt="2vh" variant="aboutText">Pamokos tikslas - {lessonToDisplay.goal}</Typography>
                        </Box>
                        <Box className={styleClasses.buttonContainer}>
                            <Button id='startLessonBtn' className={styleClasses.submitButton} onClick={() => renderLessonSubtopic(lessonToDisplay.parts[0], Array.from(lessonToDisplay.parts[0].subTopics)[0][0])}>Pradėti pamoką</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
    else
        return (
            <Typography variant="h1">Pamoka nerasta</Typography>
        )
}