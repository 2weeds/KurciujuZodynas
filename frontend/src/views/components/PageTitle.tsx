import { Box, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles";
import React from "react"

interface Props {
    pageType: string;
}

const useStyles = makeStyles({
    header: {
        paddingTop: "3vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
})

export const PageTitle = ({ pageType }: Props) => {
    const styleClasses = useStyles();
    return pageType === "user" ? (
        <Box className={styleClasses.header}>
            <Typography variant="pageTitle">
                Kompiuterinė lietuvių gestų kalbos mokymosi programa
            </Typography>
        </Box>
    ) : <Box className={styleClasses.header}>
            <Typography variant="pageTitle">
                Lietuvių gestų kalbos mokymosi programos administravimas
            </Typography>
        </Box>
}