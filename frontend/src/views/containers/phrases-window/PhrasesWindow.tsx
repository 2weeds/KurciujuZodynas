import { Box, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { phrasesRetrievalController } from "../../../config/ControllerConfiguration";
import { ViewPhrase } from "../../../controller/model/ViewPhrase";
import { PhraseList } from "../../components/PhraseList";
import { StructureList } from "../structure-list/StructureList";
import usePhraseWindow from "./usePhraseWindow";

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

function filterUnits(searchValue: string, allPhrases: ViewPhrase[], setPhrasesToDisplay: (phrases: ViewPhrase[]) => void): void {
    const filteredPhrases: ViewPhrase[] = [];

    allPhrases.forEach(phrase => {
        if (isIncluded(phrase, searchValue))
        filteredPhrases.push(phrase);
    });

    setPhrasesToDisplay(filteredPhrases);
}

function isIncluded(phrase: ViewPhrase, searchValue: string) {
    return phrase.phrase.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
}

export const PhrasesWindow = ({ pageSetter }: Props) => {
    const [allPhrases, setAllPhrases] = useState<ViewPhrase[]>([]);
    const [phrasesToDisplay, setPhrasesToDisplay] = useState<ViewPhrase[]>([]);
    const phrase = usePhraseWindow(phrasesRetrievalController, setAllPhrases);
    const [searchValue, setSearchValue] = useState<string>('');
    const styleClasses = useStyles();

    useEffect(() => {
        phrase();
    }, []);

    useEffect(() => {
        filterUnits(searchValue, allPhrases, setPhrasesToDisplay);
    }, [allPhrases, searchValue])

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
                        <Typography variant="bookPageTitle"><b>FRAZĖS</b></Typography>
                        <TextField className={styleClasses.searchField} variant="outlined" label="Frazės paieška" size="small" onChange={handleSearchBarChange}></TextField>
                        <PhraseList phrases={phrasesToDisplay} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}