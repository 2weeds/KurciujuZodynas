import React from 'react'
import { Box, Button, AppBar } from "@mui/material";

export const PageHeader = () => {
    return (
        <AppBar position="static">
            <Box pr="20vw" sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                <Button variant="text"><b>Pradžia</b></Button>
                <Button variant="text"><b>Leksika</b></Button>
                <Button variant="text"><b>Frazės</b></Button>
            </Box>
        </AppBar>
    )
}