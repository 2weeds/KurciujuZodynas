import { Button, List, ListItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
    list: {
        paddingTop: "2vh",
        paddingLeft: "3vw",
    },

    listItem: {
        display: "list-item"
    },

    listItemButton: {
        paddingTop: "2px",
        paddingBottom: "2px",
        fontWeight: 600,
        fontSize: "11px",
        "&:hover": {
            paddingLeft: "0vw",
            background: "#2196f3"
        }
    },
})

export const AllLessonsList = () => {
    const styleClasses = useStyles();

    return (
        <List className={styleClasses.list}>
            <ListItem className={styleClasses.listItem}>
                <Button className={styleClasses.listItemButton}>Kas mes esame</Button>
            </ListItem>
            <ListItem className={styleClasses.listItem}>
                <Button className={styleClasses.listItemButton}>Su kuo gyvename</Button>
            </ListItem>
            <ListItem className={styleClasses.listItem}>
                <Button className={styleClasses.listItemButton}>Ką veikiame</Button>
            </ListItem>
            <ListItem className={styleClasses.listItem}>
                <Button className={styleClasses.listItemButton}>Kur gyvename</Button>
            </ListItem>
            <ListItem className={styleClasses.listItem}>
                <Button className={styleClasses.listItemButton}>Kaip gyvename</Button>
            </ListItem>
            <ListItem className={styleClasses.listItem}>
                <Button className={styleClasses.listItemButton}>Ką mėgstame veikti</Button>
            </ListItem>
            <ListItem className={styleClasses.listItem}>
                <Button className={styleClasses.listItemButton}>Ką valgome</Button>
            </ListItem>
            <ListItem className={styleClasses.listItem}>
                <Button className={styleClasses.listItemButton}>Kaip jaučiamės</Button>
            </ListItem>
            <ListItem className={styleClasses.listItem}>
                <Button className={styleClasses.listItemButton}>Kaip bendraujame</Button>
            </ListItem>
            <ListItem className={styleClasses.listItem}>
                <Button className={styleClasses.listItemButton}>Kaip rengiamės</Button>
            </ListItem>
        </List>
    )
}