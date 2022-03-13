import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React from "react";
import { AllLessonsList } from "../all-lessons-list/AllLessonsList";

const useStyles = makeStyles({
    bookBox: {
        paddingTop: "3vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    bookPages: {
        width: "55vw",
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
        borderTop: "2px solid black",
        borderBottom: "2px solid black",
        display: "flex",
        flexDirection: "column",
        boxShadow: "6px 6px 5px 0px #908C93",
    },

    leftPage: {
        marginLeft: "2vw",
        background: "linear-gradient(90deg, #2196f3 90%, #08569B 100%)",
        color: "#EBEBEB",
        borderLeft: "2px solid black",
        //boxShadow: "-4px 0px 5px 0px #0A6FC2, -8px 0px 0px 0px #0087FF, -12px 0px 5px 0px #0A6FC2, -16px 0px 0px 0px #0087FF, 0px 6px 5px 0px #908C93",
    },

    rightPage: {
        marginRight: "2vw",
        background: "linear-gradient(90deg, #A3A3A3 0%, #EBEBEB 10%)",
        borderRight: "2px solid black",
    },
})

export const LandingWindow = () => {
    const styleClasses = useStyles();

    return (
        <Box>
            <Box className={styleClasses.bookBox}>
                <Box className={styleClasses.bookPages}>
                    <Box className={clsx(styleClasses.pages, styleClasses.leftPage)}>
                        <Typography variant="bookPageTitle">Šiuo metu KGMP sudaro tokios pamokos:</Typography>
                        <AllLessonsList />
                    </Box>
                    <Box className={clsx(styleClasses.pages, styleClasses.rightPage)}>
                        <Typography variant="bookPageTitle"><b>APIE PROGRAMĄ</b></Typography>
                        <Typography pt="2vh" variant="aboutText"><strong>Kompiuterinė lietuvių gestų kalbos mokymosi programa (KGMP) </strong> 
                                                                padeda norintiems mokytis gestų kalbos nuotoliniu būdu. 
                                                                Jei norite pradėti pamoką, kitoje pusėje paspauskite „Pradėti pamoką”. 
                                                                Jeigu jau dalyvavote pamokoje ir norite peržiūrėti, paspauskite pasirinktą temą.</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}