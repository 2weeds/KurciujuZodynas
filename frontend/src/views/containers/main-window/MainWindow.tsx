import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React from "react";

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
        borderBottom: "2px solid black"
    },

    leftPage: {
        marginLeft: "2vw",
        background: "linear-gradient(90deg, #2196f3 90%, #08569B 100%)",
        color: "#EBEBEB",
        borderLeft: "2px solid black",
    },

    rightPage: {
        marginRight: "2vw",
        background: "linear-gradient(90deg, #A3A3A3 0%, #EBEBEB 10%)",
        borderRight: "2px solid black",
    }
})

export const MainWindow = () => {
    const styleClasses = useStyles();

    return (
        <Box>
            <Box className={styleClasses.bookBox}>
                <Box className={styleClasses.bookPages}>
                    <Box className={clsx(styleClasses.pages, styleClasses.leftPage)}>
                        <Typography variant="subtitle1">Šiuo metu KGMP sudaro tokios pamokos:</Typography>
                        <ul>
                            <li><b>Kas mes esame</b></li>
                            <li><b>Su kuo gyvename</b></li>
                            <li><b>Ką veikiame</b></li>
                            <li><b>Kur gyvename</b></li>
                            <li><b>Kaip gyvename</b></li>
                            <li><b>Ką mėgstame veikti</b></li>
                            <li><b>Ką valgome</b></li>
                            <li><b>Kaip jaučiamės</b></li>
                            <li><b>Kaip bendraujame</b></li>
                            <li><b>Kaip rengiamės</b></li>
                        </ul>
                    </Box>
                    <Box className={clsx(styleClasses.pages, styleClasses.rightPage)}>
                        <Typography variant="subtitle1"><b>APIE PROGRAMĄ</b></Typography>
                        <Typography variant="subtitle1"><strong>Kompiuterinė lietuvių gestų kalbos mokymosi programa (KGMP) </strong> 
                                                                padeda norintiems mokytis gestų kalbos nuotoliniu būdu. 
                                                                Jei norite pradėti pamoką, kitoje pusėje paspauskite „Pradėti pamoką”. 
                                                                Jeigu jau dalyvavote pamokoje ir norite peržiūrėti, paspauskite pasirinktą temą.</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}