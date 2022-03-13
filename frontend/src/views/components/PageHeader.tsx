import React from 'react'
import { Box, Button, AppBar } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Props {
    pageSetter: (type: string) => void;
}

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

export const PageHeader = ({ pageSetter }: Props) => {
    const styleClasses = useStyles();

    return (
        <AppBar className={styleClasses.appBar}>
            <Box className={styleClasses.buttonBox}>
                <Button variant="text" className={styleClasses.appBarButton} onClick={() => pageSetter("landing")}>Pradžia</Button>
                <Button variant="text" className={styleClasses.appBarButton} onClick={() => pageSetter("lexicon")}>Leksika</Button>
                <Button variant="text" className={styleClasses.appBarButton}>Frazės</Button>
            </Box>
        </AppBar>
    )
}