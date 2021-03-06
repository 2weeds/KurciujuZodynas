import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { lessonsRetrievalController } from "../../../config/ControllerConfiguration";
import { ViewLesson } from "../../../controller/model/ViewLesson";
import useLandingWindow from "./useLandingWindow";

interface Props {
    pageSetter: (type: string) => void;
    lessonSetter: (type: ViewLesson | undefined) => void;
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
})

export const LandingWindow = ({ pageSetter, lessonSetter }: Props) => {
    const [allLessons, setAllLessons] = useState<ViewLesson[]>([]);
    const lesson = useLandingWindow(lessonsRetrievalController, setAllLessons);
    const styleClasses = useStyles();

    useEffect(() => {
        lesson();
    }, [])

    const handleLessonClick = (lesson: ViewLesson) => {
        lessonSetter(lesson);
        pageSetter("lesson");
    }

    return (
        <Box>
            <Box className={styleClasses.formBox}>
                <Box className={styleClasses.bookPages}>
                    <Box className={clsx(styleClasses.pages, styleClasses.leftPage)}>
                        <Typography variant="bookPageTitle">??iuo metu KGMP sudaro tokios pamokos:</Typography>
                        <List className={styleClasses.list}>
                            {
                                allLessons.map((lesson: ViewLesson, index: number) => (
                                    <ListItem className={styleClasses.listItem} key={index + '-listItem'}>
                                        <Button id= {'lessonBtn'+index} key={index + '-lessonBtn'} className={styleClasses.listItemButton} onClick={() => handleLessonClick(lesson)}>{lesson.name}</Button>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Box>
                    <Box className={clsx(styleClasses.pages, styleClasses.rightPage)}>
                        <Typography variant="bookPageTitle"><b>APIE PROGRAM??</b></Typography>
                        <Typography pt="2vh" variant="aboutText"><strong>Kompiuterin?? lietuvi?? gest?? kalbos mokymosi programa (KGMP) </strong> 
                                                                padeda norintiems mokytis gest?? kalbos nuotoliniu b??du. 
                                                                Jei norite prad??ti pamok??, kitoje pus??je paspauskite ???Prad??ti pamok?????. 
                                                                Jeigu jau dalyvavote pamokoje ir norite per??i??r??ti, paspauskite pasirinkt?? tem??.</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}