import { Box, Typography, TextField, List, ListItem, Button, Table, TableBody, TableRow, TableCell, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player';
import { phrasesRetrievalController } from "../../../config/ControllerConfiguration";
import { ViewPhrase } from "../../../controller/model/ViewPhrase";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
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
        overflow: 'auto',
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
    const [file, setFile] = useState<any>(new File([], 'empty'));
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

    const handleOutsideClick = () => {
        setFile(new File([], 'empty'));
      }

    const renderVideoViewer = () => {
        if (file.name !== 'empty')
            return (
                <ReactPlayer controls url={`//localhost:8000/fileStorage/phrases/${file.filename}`} />
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
                        <Box sx={videoModal} width={{ xs: "70vw", sm: "40vw", md: "25vw" }} height={{xs: '100vh', sm: '60vh', md: '40vh'}}>
                            {renderVideoViewer()}
                        </Box>
                    </Modal>
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
                        <Typography variant="bookPageTitle"><b>FRAZĖS</b></Typography>
                        <TextField className={styleClasses.searchField} variant="outlined" label="Frazės paieška" size="small" onChange={handleSearchBarChange}></TextField>
                        <Box className={styleClasses.elementTable}>
                            <Table>
                                <TableBody>
                                    {phrasesToDisplay.map((phrase, index) => (
                                        <TableRow key={index + "-row"}>
                                            <TableCell sx={{width: '75%'}} key={index + "-cell"}>
                                                <Typography key={index + "-phrase"} pt="1vh" variant="aboutText">{phrase.phrase}</Typography>
                                            </TableCell>
                                            <TableCell sx={{width: '25%'}} key={index + "-cellPlay"}>
                                                <PlayArrowRoundedIcon className={styleClasses.playButton} key={index + "-playIcon"} onClick={() => setFile(phrase.file)}></PlayArrowRoundedIcon>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}