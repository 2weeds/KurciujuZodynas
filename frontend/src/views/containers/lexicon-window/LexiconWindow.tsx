import { Box, Typography, TextField, List, ListItem, Button, Table, TableBody, TableRow, TableCell, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player';
import { lexiconUnitsRetrievalController } from "../../../config/ControllerConfiguration";
import { ViewLexiconUnit } from "../../../controller/model/ViewLexiconUnit";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
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
        width: "60vw",
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

    playButton: {
        color: 'green',
        fontSize: '36px',
    },

    elementTable: {
        paddingTop: '2vh',
        height: '100%',
    },

    lessonButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '1vh',
        justifyContent: 'center'
    },

    lessonButtons: {
        color: 'black',
        fontWeight: 600,
        fontSize: "13px",
        "&:hover": {
            background: "#D5D7D7"
        }
    }
})

const videoModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px #000",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: 'auto',
    width: 'fit-content',
    height: 'fit-content',
  }
  
function removeExtraWhitespaces(element: string) {
    return element.trim().split(/\s\s+/g).join(' ');
}

function filterUnits(searchValue: string, allUnits: ViewLexiconUnit[]): ViewLexiconUnit[] {
    const filteredUnits: ViewLexiconUnit[] = [];

    allUnits.forEach(unit => {
        if (isIncluded(unit, searchValue))
            filteredUnits.push(unit);
    });

    return filteredUnits;
}

function setPageElements(pageNumber: number, unitsToDisplay: ViewLexiconUnit[], isLastPage: boolean,
                         setUnitsToDisplay: (units: ViewLexiconUnit[]) => void,
                         setPageBlocker: (isLastPage: boolean) => void): void {
    const elementsPerPage = 11;
    const firstElementIndex = (pageNumber - 1) * elementsPerPage;
    const secondElementIndex = (pageNumber * elementsPerPage);
    const unitsInCurrentPage: ViewLexiconUnit[] = unitsToDisplay.slice(firstElementIndex, secondElementIndex);

    if (secondElementIndex >= unitsToDisplay.length) {
        setPageBlocker(true);
    } else if (isLastPage === true) {
        setPageBlocker(false);
    }

    setUnitsToDisplay(unitsInCurrentPage);
}

function isIncluded(unit: ViewLexiconUnit, searchValue: string) {
    return unit.word.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || unit.abbreviation.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
}

export const LexiconWindow = ({ pageSetter }: Props) => {
    const [allUnits, setAllUnits] = useState<ViewLexiconUnit[]>([]);
    const [unitsToDisplay, setUnitsToDisplay] = useState<ViewLexiconUnit[]>([]);
    const lexiconUnit = useLexiconWindow(lexiconUnitsRetrievalController, setAllUnits);
    const [searchValue, setSearchValue] = useState<string>('');
    const [file, setFile] = useState<any>(new File([], 'empty'));
    const [pageNumber, setPageNumber] = useState<number>(1); 
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const styleClasses = useStyles();

    useEffect(() => {
        lexiconUnit();
    }, []);

    useEffect(() => {
        const filteredUnits = filterUnits(searchValue, allUnits);
        setPageElements(pageNumber, filteredUnits, isLastPage, setUnitsToDisplay, setIsLastPage);
    }, [allUnits, searchValue, pageNumber])

    const handleSearchBarChange = (element: any) => {
        const inputValue = element.target.value.trim();
        const trimmedValue = removeExtraWhitespaces(inputValue);
        setSearchValue(trimmedValue);
        setPageNumber(1);
    }

    const handleOutsideClick = () => {
        setFile(new File([], 'empty'));
    }

    const handleNavigationClick = (direction: string) => {
        if (direction === "back") {
            if (pageNumber > 1) {
                setPageNumber(pageNumber - 1);
            }
        } else if (direction === "forward") {
            if (!isLastPage) {
                setPageNumber(pageNumber + 1);
            }
        }
    }

    const renderVideoViewer = () => {
        if (file.name !== 'empty')
            return (
                <ReactPlayer controls url={`//localhost:8000/fileStorage/lexicon/${file.filename}`} />
            )
        else
            return (
                <Typography variant='pageTitle'>Video not found</Typography>
            )
    }

    return (
        <Box>
            <Box className={styleClasses.formContainer}>
                <Box className={styleClasses.form}>
                    <Modal
                    data-testid="videoModal"
                    open={file.name !== 'empty'}
                    closeAfterTransition
                    onClose={handleOutsideClick}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                        <Box sx={videoModal}>
                            {renderVideoViewer()}
                        </Box>
                    </Modal>
                    <Box className={clsx(styleClasses.sides, styleClasses.leftSide)}>
                        <Typography variant="bookPageTitle">KGMP struktūra:</Typography>
                        <List className={styleClasses.list}>
                            <ListItem className={styleClasses.listItem}>
                                <Button id='landingWindowBtn' className={styleClasses.listItemButton} onClick={() => pageSetter("landing")}>Pamokos</Button>
                            </ListItem>
                            <ListItem className={styleClasses.listItem}>
                                <Button id='lexiconWindowBtn' className={styleClasses.listItemButton} onClick={() => pageSetter("lexicon")}>Leksika</Button>
                            </ListItem>
                            <ListItem className={styleClasses.listItem}>
                                <Button id='phrasesWindowBtn' className={styleClasses.listItemButton} onClick={() => pageSetter("phrases")}>Frazės</Button>
                            </ListItem>
                        </List>
                    </Box>
                    <Box className={clsx(styleClasses.sides, styleClasses.rightSide)}>
                        <Typography variant="bookPageTitle"><b>LEKSIKA</b></Typography>
                        <TextField className={styleClasses.searchField} variant="outlined" label="Žodžio paieška" size="small" onChange={handleSearchBarChange}></TextField>
                        <Box className={styleClasses.elementTable}>
                            <Table size='small' padding='none'>
                                <TableBody>
                                    {unitsToDisplay.map((unit, index) => (
                                        <TableRow key={index + "-row"}>
                                            <TableCell sx={{width: '45%'}} key={index + "-cellWord"}>
                                                <Typography key={index + "-word"} pt="1vh" variant="aboutText">{unit.word}</Typography>
                                            </TableCell>
                                            <TableCell sx={{width: '30%'}} key={index + "-cellAbbr"}>
                                                <Typography key={index + "-abbr"} pt="1vh" variant="aboutText">{unit.abbreviation}</Typography>
                                            </TableCell>
                                            <TableCell sx={{width: '25%'}} key={index + "-cellPlay"}>
                                                <PlayArrowRoundedIcon id='playVideoBtn' className={styleClasses.playButton} key={index + "-playIcon"} onClick={() => setFile(unit.file)}></PlayArrowRoundedIcon>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                        <Box className={styleClasses.lessonButtonContainer}>
                            <Button id = 'backBtn' className={styleClasses.lessonButtons} variant="text" onClick={() => handleNavigationClick("back")}>ATGAL</Button>
                            <Button id = 'forwardBtn' className={styleClasses.lessonButtons} variant="text" onClick={() => handleNavigationClick("forward")}>PIRMYN</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}