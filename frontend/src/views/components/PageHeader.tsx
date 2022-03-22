import React from 'react'
import { Box, Button, AppBar } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Props {
    pageSetter: (type: string) => void;
}

const useStyles = makeStyles({
    appBar: {
        position: "static",
        display: "flex",
        flexDirection: "row"
    },

    adminButtonsBox: {
        display: "flex",
        paddingLeft: "1vw",
        width: "50%",
        justifyContent: "flex-start",
    },

    userButtonsBox: {
        display: "flex",
        flexDirection: "row",
        paddingRight: "20vw",
        width: "50%",
        justifyContent: "flex-end",
    },

    appBarButton: {
        fontSize: "11px",
        fontWeight: 100,
        color: 'black',
    }
})

export const PageHeader = ({ pageSetter }: Props) => {
    const styleClasses = useStyles();

    return (
        <AppBar className={styleClasses.appBar}>
            <Box className={styleClasses.adminButtonsBox}>
                <Button variant="text" className={styleClasses.appBarButton} onClick={() => pageSetter("admin")}>Administracija</Button>
            </Box>
            <Box className={styleClasses.userButtonsBox}>
                <Button variant="text" className={styleClasses.appBarButton} onClick={() => pageSetter("landing")}>Pradžia</Button>
                <Button variant="text" className={styleClasses.appBarButton} onClick={() => pageSetter("lexicon")}>Leksika</Button>
                <Button variant="text" className={styleClasses.appBarButton} onClick={() => pageSetter("phrases")}>Frazės</Button>
            </Box>
        </AppBar>
    )
}