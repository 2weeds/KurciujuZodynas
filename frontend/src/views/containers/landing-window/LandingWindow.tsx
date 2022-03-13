import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React from "react";
import { StructureList } from "../structure-list/StructureList";

interface Props {
    pageSetter: (type: string) => void;
}

const useStyles = makeStyles({
    formBox: {
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
})

export const LandingWindow = ({ pageSetter }: Props) => {
    const styleClasses = useStyles();

    return (
        <Box>
            <Box className={styleClasses.formBox}>
                <Box className={styleClasses.bookPages}>
                    <Box className={clsx(styleClasses.pages, styleClasses.leftPage)}>
                        <Typography variant="bookPageTitle">Šiuo metu KGMP sudaro tokios pamokos:</Typography>
                        <StructureList type="lessons" pageSetter={pageSetter} />
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