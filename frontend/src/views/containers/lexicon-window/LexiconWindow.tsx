import { Box, Typography, TextField, List, ListItem, Button, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { lexiconUnitsRetrievalController } from "../../../config/ControllerConfiguration";
import { ViewLexiconUnit } from "../../../controller/model/ViewLexiconUnit";
import useLexiconWindow from "./useLexiconWindow";

interface Props {
    pageSetter: (type: string) => void;
}

const useStyles = makeStyles({
    formContainer: {
        paddingTop: "3vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    form: {
        width: "55vw",
        height: "80vh",
        background: "#fff",
        display: "flex",
        flexDirection: "row",
    },

    sides: {
        marginTop: "3vh",
        marginBottom: "3vh",
        padding: "5vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "6px 6px 5px 0px #908C93",
    },

    leftSide: {
        marginLeft: "2vw",
        background: "linear-gradient(90deg, #2196f3 90%, #08569B 100%)",
        color: "#EBEBEB",
        borderTop: "1px solid #074E88",
        borderBottom: "1px solid #074E88",
        borderLeft: "1px solid #074E88",
        width: "20%",
    },

    rightSide: {
        marginRight: "2vw",
        background: "linear-gradient(90deg, #A3A3A3 0%, #EBEBEB 10%)",
        borderTop: "1px solid #8F8F8F",
        borderBottom: "1px solid #8F8F8F",
        borderRight: "1px solid #8F8F8F",
        width: "70%",
    },

    searchField: {
        marginTop: "2vh",
        width: "15vw",
        "& label.Mui-focused": {
            color: "black"
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "black"
            }
          }
    },

    list: {
        paddingTop: "2vh",
        paddingLeft: "3vw",
        listStyle: "disc",
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
  
function removeExtraWhitespaces(element: string) {
    return element.trim().split(/\s\s+/g).join(' ');
}

function filterUnits(searchValue: string, allUnits: ViewLexiconUnit[], setUnitsToDisplay: (units: ViewLexiconUnit[]) => void): void {
    const filteredUnits: ViewLexiconUnit[] = [];

    allUnits.forEach(unit => {
        if (isIncluded(unit, searchValue))
            filteredUnits.push(unit);
    });

    setUnitsToDisplay(filteredUnits);
}

function isIncluded(unit: ViewLexiconUnit, searchValue: string) {
    return unit.word.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || unit.abbreviation.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
}

export const LexiconWindow = ({ pageSetter }: Props) => {
    const [allUnits, setAllUnits] = useState<ViewLexiconUnit[]>([]);
    const [unitsToDisplay, setUnitsToDisplay] = useState<ViewLexiconUnit[]>([]);
    const lexiconUnit = useLexiconWindow(lexiconUnitsRetrievalController, setAllUnits);
    const [searchValue, setSearchValue] = useState<string>('');
    const styleClasses = useStyles();

    useEffect(() => {
        lexiconUnit();
    }, []);

    useEffect(() => {
        filterUnits(searchValue, allUnits, setUnitsToDisplay);
    }, [allUnits, searchValue])

    const handleSearchBarChange = (element: any) => {
        const inputValue = element.target.value.trim();
        const trimmedValue = removeExtraWhitespaces(inputValue);
        setSearchValue(trimmedValue);
    }

    return (
        <Box>
            <Box className={styleClasses.formContainer}>
                <Box className={styleClasses.form}>
                    <Box className={clsx(styleClasses.sides, styleClasses.leftSide)}>
                        <Typography variant="bookPageTitle">KGMP struktūra:</Typography>
                        <List className={styleClasses.list}>
                            <ListItem className={styleClasses.listItem}>
                                <Button className={styleClasses.listItemButton} onClick={() => pageSetter("landing")}>Pamokos</Button>
                            </ListItem>
                            <ListItem className={styleClasses.listItem}>
                                <Button className={styleClasses.listItemButton} onClick={() => pageSetter("lexicon")}>Leksika</Button>
                            </ListItem>
                            <ListItem className={styleClasses.listItem}>
                                <Button className={styleClasses.listItemButton} onClick={() => pageSetter("phrases")}>Frazės</Button>
                            </ListItem>
                        </List>
                    </Box>
                    <Box className={clsx(styleClasses.sides, styleClasses.rightSide)}>
                        <Typography variant="bookPageTitle"><b>LEKSIKA</b></Typography>
                        <TextField className={styleClasses.searchField} variant="outlined" label="Žodžio paieška" size="small" onChange={handleSearchBarChange}></TextField>
                        <Table>
                            <TableBody>
                                {unitsToDisplay.map((unit, index) => (
                                    <TableRow key={index + "-row"}>
                                        <TableCell key={index + "-cellWord"}>
                                            <Typography key={index + "-word"} pt="1vh" variant="aboutText">{unit.word}</Typography>
                                        </TableCell>
                                        <TableCell key={index + "-cellAbbr"}>
                                            <Typography key={index + "-abbr"} pt="1vh" variant="aboutText">{unit.abbreviation}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}