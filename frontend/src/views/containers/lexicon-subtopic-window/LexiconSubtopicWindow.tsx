import { Box, Typography, List, ListItem, Button, Divider, Table, TableBody, TableRow, TableCell, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React, { useState } from "react";
import { ViewLesson } from "../../../controller/model/ViewLesson";
import { ViewLessonPart } from "../../../controller/model/ViewLessonPart";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ReactPlayer from "react-player";

interface Props {
    pageSetter: (type: string) => void;
    lesson: ViewLesson | undefined;
    part: ViewLessonPart | undefined;
    partSetter: (type: ViewLessonPart | undefined) => void;
    lessonSetter: (type: ViewLesson | undefined) => void;
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
        position: 'relative'
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
        paddingLeft: "2vw",
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

    lessonButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: '3vh',
        right: '35%'
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

export const LexiconSubtopicWindow = ({ pageSetter, lesson, part, partSetter, lessonSetter }: Props) => {
    const [file, setFile] = useState<any>(new File([], 'empty'));
    const styleClasses = useStyles();

    const transformToLithuanian = (key: string) => {
        if (key === "grammar")
            return "Gramatika";
        else if (key === "lexicon")
            return "Leksika";
        else if (key === "phrases")
            return "Frazės";
        else if (key === "information")
            return "Sociokultūrinė informacija";
        else if (key === 'test')
            return "Užduotis";
    }

    const handleOnClick = (key: string) => {
        if (key === "lexicon")
            pageSetter("lexiconSubtopic");
        if (key === "phrases")
            pageSetter("phrasesSubtopic");
        if (key === "grammar")
            pageSetter("grammar");
        if (key === "information")
            pageSetter("information");
        if (key === "test")
            pageSetter("test");
    }

    const renderLessonPartSubtopics = () => {
        return (
            Array.from(part!.subTopics).map((arrayObject: any) => (
                <ListItem className={styleClasses.listItem}>
                    <Button className={styleClasses.listItemButton} onClick={() => handleOnClick(arrayObject[0])}>{transformToLithuanian(arrayObject[0])}</Button>
                </ListItem>
            ))
        )
    }

    const handleOutsideClick = () => {
        setFile(new File([], 'empty'));
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

    const moveBackToDifferentLessonPartIfExists = () => {
        lesson?.parts.forEach((lessonPart, index) => {
            if (part === lessonPart && index === 0) {
                partSetter(undefined);
                pageSetter('landing');
                lessonSetter(undefined);
            } else if (part === lessonPart) {
                const newPart = lesson.parts[index - 1];
                if (newPart.subTopics.has('test')) {
                    pageSetter('test')
                } else if (newPart.subTopics.has('information') && !newPart.subTopics.has('test')) {
                    pageSetter('information');
                } else if (newPart.subTopics.has('grammar') && !newPart.subTopics.has('test') && !newPart.subTopics.has('information')) {
                    pageSetter('grammar');
                } else if (newPart.subTopics.has('phrases') && !newPart.subTopics.has('test') && !newPart.subTopics.has('information') && !newPart.subTopics.has('grammar')) {
                    pageSetter('phrasesSubtopic');
                } else if (newPart.subTopics.has('lexicon') && !newPart.subTopics.has('test') && !newPart.subTopics.has('information') && !newPart.subTopics.has('grammar') && !newPart.subTopics.has('phrases')) {
                    pageSetter('lexiconSubtopic');
                }
                partSetter(newPart);
            }
        })
    }

    const handleBackClick = () => {
        moveBackToDifferentLessonPartIfExists()
    }

    const moveForwardToDifferentLessonPartIfExists = () => {
        const totalLessonParts = lesson?.parts.length;
        lesson?.parts.forEach((lessonPart, index) => {
            if (part === lessonPart && index === (totalLessonParts! - 1)) {
                partSetter(undefined);
                pageSetter('landing');
                lessonSetter(undefined);
            } else if (part === lessonPart) {
                const newPart = lesson.parts[index + 1];
                if (newPart.subTopics.has('lexicon')) {
                    pageSetter('lexiconSubtopic');
                } else if (newPart.subTopics.has('phrases') && !newPart.subTopics.has('lexicon')) {
                    pageSetter('phrasesSubtopic');
                } else if (newPart.subTopics.has('grammar') && !newPart.subTopics.has('lexicon') && !newPart.subTopics.has('phrases')) {
                    pageSetter('grammar');
                } else if (newPart.subTopics.has('information') && !newPart.subTopics.has('lexicon') && !newPart.subTopics.has('phrases') && !newPart.subTopics.has('grammar')) {
                    pageSetter('information');
                } else if (newPart.subTopics.has('test') && !newPart.subTopics.has('lexicon') && !newPart.subTopics.has('phrases') && !newPart.subTopics.has('grammar') && !newPart.subTopics.has('information')) {
                    pageSetter('test');
                }
                partSetter(newPart);
            }
        })
    }

    const handleForwardClick = () => {
        if (part?.subTopics.has('phrases')) {
            pageSetter('phrasesSubtopic');
        } else if (part?.subTopics.has('grammar') && !part?.subTopics.has('phrases')) {
            pageSetter('grammar');
        } else if (part?.subTopics.has('information') && !part?.subTopics.has('phrases') && !part?.subTopics.has('grammar')) {
            pageSetter('information');
        } else if (part?.subTopics.has('test') && !part?.subTopics.has('phrases') && !part?.subTopics.has('grammar') && !part?.subTopics.has('information')) {
            pageSetter('test');
        } else {
            moveForwardToDifferentLessonPartIfExists()
        }
    }

    return (
        <Box>
            <Box className={styleClasses.formContainer}>
                <Box className={styleClasses.form}>
                    <Box className={clsx(styleClasses.sides, styleClasses.leftSide)}>
                        <Typography variant="bookPageTitle">Dalies informacinė struktūra:</Typography>
                        <List className={styleClasses.list}>
                            {renderLessonPartSubtopics()}
                        </List>
                    </Box>
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
                    <Box className={clsx(styleClasses.sides, styleClasses.rightSide)}>
                        <Typography variant="bookPageTitle"><b>LEKSIKA</b></Typography>
                        <Divider sx={{paddingTop: '3vh'}} />
                        <Table>
                            <TableBody>
                                {part?.subTopics.get('lexicon').map((unit: any, index: number) => (
                                    <TableRow key={index + "-row"}>
                                        <TableCell key={index + "-cellWord"}>
                                            <Typography key={index + "-word"} pt="1vh" variant="aboutText">{unit.word}</Typography>
                                        </TableCell>
                                        <TableCell key={index + "-cellAbbr"}>
                                            <Typography key={index + "-abbr"} pt="1vh" variant="aboutText">{unit.abbreviation}</Typography>
                                        </TableCell>
                                        <TableCell key={index + "-cellPlay"}>
                                            <PlayArrowRoundedIcon id = {'videoPlayerBtn'+index} className={styleClasses.playButton} key={index + "-playIcon"} onClick={() => setFile(unit.file)}></PlayArrowRoundedIcon>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Box className={styleClasses.lessonButtonContainer}>
                            <Button id = 'backBtn' className={styleClasses.lessonButtons} variant="text" onClick={() => handleBackClick()}>Atgal</Button>
                            <Button id = 'forwardBtn' className={styleClasses.lessonButtons} variant="text" onClick={() => handleForwardClick()}>Pirmyn</Button>
                            <Button id = 'toLessonBtn' className={styleClasses.lessonButtons} variant="text" onClick={() => pageSetter("lesson")}>Į pamoką</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}