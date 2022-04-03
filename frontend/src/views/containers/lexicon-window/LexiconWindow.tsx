import { Box, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { lexiconUnitsRetrievalController } from "../../../config/ControllerConfiguration";
import { ViewLexiconUnit } from "../../../controller/model/ViewLexiconUnit";
import { LexiconUnitList } from "../../components/LexiconUnitList";
import { StructureList } from "../structure-list/StructureList";
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
    }
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
                        <StructureList type="structure" pageSetter={pageSetter} />
                    </Box>
                    <Box className={clsx(styleClasses.sides, styleClasses.rightSide)}>
                        <Typography variant="bookPageTitle"><b>LEKSIKA</b></Typography>
                        <TextField className={styleClasses.searchField} variant="outlined" label="Žodžio paieška" size="small" onChange={handleSearchBarChange}></TextField>
                        <LexiconUnitList units={unitsToDisplay}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}