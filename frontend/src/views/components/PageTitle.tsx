import { Box, Typography } from "@mui/material"
import React from "react"

export const PageTitle = () => {
    return (
        <Box pt="3vh" sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Typography variant="h5">
                Kompiuterinė lietuvių gestų kalbos mokymosi programa
            </Typography>
        </Box>
    )
}