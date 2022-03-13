import { Box, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles";
import React from "react"

const useStyles = makeStyles({
    header: {
        paddingTop: "3vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
})

export const PageTitle = () => {
    const styleClasses = useStyles();

    return (
        <Box className={styleClasses.header}>
            <Typography variant="pageTitle">
                Kompiuterinė lietuvių gestų kalbos mokymosi programa
            </Typography>
        </Box>
    )
}