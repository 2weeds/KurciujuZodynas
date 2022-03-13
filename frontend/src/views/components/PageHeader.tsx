import React from 'react'
import { Box, Button, AppBar } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    appBar: {
        position: "static",
    },

    buttonBox: {
        paddingRight: "20vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },

    appBarButton: {
        fontSize: "11px",
        fontWeight: 100,
        color: 'black',
    }
})

export const PageHeader = () => {
    const styleClasses = useStyles();

    return (
        <AppBar className={styleClasses.appBar}>
            <Box className={styleClasses.buttonBox}>
                <Button variant="text" className={styleClasses.appBarButton}>Pradžia</Button>
                <Button variant="text" className={styleClasses.appBarButton}>Leksika</Button>
                <Button variant="text" className={styleClasses.appBarButton}>Frazės</Button>
            </Box>
        </AppBar>
    )
}