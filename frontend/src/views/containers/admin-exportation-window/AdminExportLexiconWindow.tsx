import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ViewLexiconUnit } from "../../../controller/model/ViewLexiconUnit";
import useLexiconWindow from "../lexicon-window/useLexiconWindow";
import { lexiconUnitsRetrievalController } from "../../../config/ControllerConfiguration";
import React, { ChangeEvent, useEffect, useState } from "react";
import JSZip from "jszip";
import ReactPlayer from "react-player";

interface Props {
    token: string | undefined
    page: string
    pageSetter: (type: string) => void
}

const useStyles = makeStyles({
    formContainer: {
        paddingTop: "10vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:'flex-start',
    },

    form: {
        display: "flex",
        flexDirection: "row",
        paddingLeft: "5vh",
        paddingRight: "5vh",
        width: "100vh",
        height: "auto",
        alignItems: "center",
        background: "#EBEBEB",
        boxShadow: "0px 5px 5px 0px #908C93, -10px 5px 5px -5px #908C93, 10px 5px 5px -5px #908C93",
        borderRadius: 10,
        clear: "both",

    },
    videoForm: {
        display: "flex",
        flexDirection: "row",
        paddingLeft: "5vh",
        paddingRight: "5vh",
        width: "100vh",
        height: "auto",
        alignItems: "center",
        background: "#EBEBEB",
        boxShadow: "0px 5px 5px 0px #908C93, -10px 5px 5px -5px #908C93, 10px 5px 5px -5px #908C93",
        borderRadius: 10,
        clear: "both",
        overflow:'auto',
        
    },

    leftForm: {
        marginTop: "3vh",
        marginBottom: "3vh",
        marginRight: "3vh",
        padding: "5vh",
        display: "flex",
        flexDirection: "column",
        width: "35%"
    },

    rightForm: {
        marginTop: "3vh",
        marginBottom: "3vh",
        marginLeft: "3vh",
        padding: "5vh",
        display: "flex",
        flexDirection: "column",
        width: "35%"
    },


    inputField: {
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

    addWordForExportationButton: {
        height: "2vh",
        width: "2vh",
        float: "right",
        color: "green",
        backgroundColor: '#EBEBEB',
        border: "1px solid",
        borderRadius: "5px",
        borderColor: "black",
        '&:hover': {
            backgroundColor: '#fff',
            '&:active': {
                backgroundColor: '#a8a8a8',
            }
        }
    },

    removeWordFromExportationButton: {
        height: "2vh",
        width: "2vh",
        float: "right",
        color: "red",
        backgroundColor: '#EBEBEB',
        border: "1px solid",
        borderRadius: "5px",
        borderColor: "black",
        '&:hover': {
            backgroundColor: '#fff',
            '&:active': {
                backgroundColor: '#a8a8a8',
            }
        }

    },

    submitButton: {
        display: "flex",
        flex: "row",
        marginTop: "2vh",
        marginBottom: "2vh",
        width: "15vw",
        background: "linear-gradient(45deg, #2196f3 30%, #A9DDD6 90%)",
        color: "#EBEBEB",
        fontWeight: 600,
    }
})


const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #ddd;
  }
`;

const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .MuiTablePaginationUnstyled-toolbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .MuiTablePaginationUnstyled-selectLabel {
    margin: 0;
  }

  & .MuiTablePaginationUnstyled-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .MuiTablePaginationUnstyled-spacer {
    display: none;
  }

  & .MuiTablePaginationUnstyled-actions {
    display: flex;
    gap: 0.25rem;
  }
`;


export const AdminExportLexiconWindow = ({ token, page, pageSetter }: Props) => {
    const [leftTablePage, setLeftPage] = useState(0);
    const [rightTablePage, setRightPage] = useState(0);
    const [rowsPerLeftPage, setRowsPerLeftPage] = useState(5);
    const [rowsPerRightPage, setRowsPerRightPage] = useState(5);
    const [rows, setRows] = useState<ViewLexiconUnit[]>([]);
    const lexiconUnit = useLexiconWindow(lexiconUnitsRetrievalController, setRows);
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsToExport, updateItemsToExport] = useState<ViewLexiconUnit[]>([]);
    const [file, setFile] = useState<any>(new File([], 'empty'));
    const emptyLeftRows =
        leftTablePage > 0 ? Math.max(0, (1 + leftTablePage) * rowsPerLeftPage - rows.length) : 0;
    useEffect(() => {
        lexiconUnit();
    }, []);
    const emptyRightRows =
        rightTablePage > 0 ? Math.max(0, (1 + rightTablePage) * rowsPerRightPage - itemsToExport.length) : 0;
    useEffect(() => {
        lexiconUnit();
    }, []);
    // const handleOutsideClick = () => {
    //     setFile(new File([], 'empty'));
    // }
    const handleChangeLeftPage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setLeftPage(newPage);
    };
    const handleChangeRightPage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setRightPage(newPage);
    };
    const handleChangeRowsPerLeftPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerLeftPage(parseInt(event.target.value, 10));
        setLeftPage(0);
    };
    const handleChangeRowsPerRightPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerRightPage(parseInt(event.target.value, 10));
        setRightPage(0);
    };
    const handleClickAdd = (word: ViewLexiconUnit,) => {
        itemsToExport.push(word);
        setFile(word.file);
        setRows(rows.filter(val => val !== word))
    };
    const handleClickRemove = (word: ViewLexiconUnit,) => {
        rows.push(word);
        updateItemsToExport(itemsToExport.filter(val => val !== word))
    };
    const styleClasses = useStyles();
    const downloadZip = (data: ViewLexiconUnit[],) =>{
        var FileSaver = require('file-saver');
        var zip = new JSZip();
        var text = zip.folder("HelloFolder");
        text?.file("hello.txt", "Hello world\n");
        zip.file("hello.txt", "Hello world\n");
        
        zip.generateAsync({type:"blob"}).then(function(content) {
            FileSaver.saveAs(content, "example.zip");
        });
    };
    // const renderVideoViewer = () => {
    //     if (file.name !== 'empty')
    //         return (
    //             <ReactPlayer controls url={`//localhost:8000/fileStorage/lexicon/${file.filename}`} />
    //         )
    //     else
    //         return (
    //             <Typography variant='pageTitle'>Video not found</Typography>
    //         )
    // }
    return (
        <Box>
            <Box className={styleClasses.formContainer}>
                <Box className={styleClasses.form}>
                    <Box className={styleClasses.leftForm}>
                        <Root sx={{ maxWidth: '100%', width: 400 }}>
                            <TextField className={styleClasses.inputField}
                                variant="outlined"
                                label="Paieška"
                                size="small"
                                onChange={(event) => {
                                    setSearchTerm(event.target.value);
                                }}>
                            </TextField>
                            <table aria-label="custom pagination table">
                                <thead>
                                    <tr>
                                        <th>Žodis</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(rowsPerLeftPage > 0
                                        ? rows.slice(leftTablePage * rowsPerLeftPage, leftTablePage * rowsPerLeftPage + rowsPerLeftPage)
                                        : rows)
                                        .filter((val) => {
                                            if (searchTerm === "") {
                                                return val
                                            }
                                            else if (val.word.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return val
                                            }
                                        }).map((row) => (
                                            <tr key={row.word}>{
                                                itemsToExport.includes(row) ?
                                                    null :
                                                    <td style={{ width: 500 }}>
                                                        {row.word}
                                                        <AddIcon
                                                            className={styleClasses.addWordForExportationButton}
                                                            onClick={() => handleClickAdd(row)}>
                                                        </AddIcon>
                                                    </td>
                                            }
                                            </tr>
                                        ))
                                    }
                                    {emptyLeftRows > 0 && (
                                        <tr style={{ height: 41 * emptyLeftRows }}>
                                            <td colSpan={3} />
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <CustomTablePagination
                                            labelRowsPerPage="Rodyti po:"
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={rows.length}
                                            rowsPerPage={rowsPerLeftPage}
                                            page={leftTablePage}
                                            componentsProps={{
                                                select: {
                                                    'aria-label': 'rows per tablePage',
                                                },
                                                actions: {
                                                    showFirstButton: true,
                                                    showLastButton: true,
                                                } as any,
                                            }}
                                            onPageChange={handleChangeLeftPage}
                                            onRowsPerPageChange={handleChangeRowsPerLeftPage}
                                        />
                                    </tr>
                                </tfoot>
                            </table>
                        </Root>
                    </Box>
                    <Box className={styleClasses.rightForm}>
                        <Root sx={{ maxWidth: '100%', width: 400 }}>
                            <table aria-label="custom pagination table">
                                <thead>
                                    <tr>
                                        <th>Pridėtos frazės eksportavimui:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(rowsPerRightPage > 0
                                        ? itemsToExport.slice(rightTablePage * rowsPerRightPage, rightTablePage * rowsPerRightPage + rowsPerRightPage)
                                        : itemsToExport)
                                        .map((row) => (
                                            <tr key={row.word}>
                                                <td style={{ width: 500 }} align="right">
                                                    {row.word}
                                                    <RemoveIcon
                                                        className={styleClasses.removeWordFromExportationButton}
                                                        onClick={() => handleClickRemove(row)}>
                                                    </RemoveIcon>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    {emptyRightRows > 0 && (
                                        <tr style={{ height: 41 * emptyRightRows }}>
                                            <td colSpan={3} />
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <CustomTablePagination
                                            labelRowsPerPage="Rodyti po:"
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={itemsToExport.length}
                                            rowsPerPage={rowsPerRightPage}
                                            page={rightTablePage}
                                            componentsProps={{
                                                select: {
                                                    'aria-label': 'rows per tablePage',
                                                },
                                                actions: {
                                                    showFirstButton: true,
                                                    showLastButton: true,
                                                } as any,
                                            }}
                                            onPageChange={handleChangeRightPage}
                                            onRowsPerPageChange={handleChangeRowsPerRightPage}
                                        />
                                    </tr>
                                </tfoot>
                            </table>
                        </Root>
                    </Box>
                </Box>
                <Box className={styleClasses.form}>
                    <Button className={styleClasses.submitButton} onClick={() => { downloadZip(itemsToExport)}}>Eksportuoti</Button>
                </Box>
                {/* <Box className={styleClasses.videoForm}>
                <Root sx={{ maxWidth: '100%', width: 1000 }}>
                            <table aria-label="custom pagination table">
                                <thead>
                                    <tr>
                                        <th>Žodis</th>
                                        <th>Vaizdo įrašas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        itemsToExport.map((unit) => (
                                            <tr key={unit.word}>
                                                <td style={{ width: 500 }} align="right">
                                                    {unit.word}
                                                </td>
                                                <td>
                                                <ReactPlayer controls url={`//localhost:8000/fileStorage/lexicon/${file.filename}`} />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    {emptyRightRows > 0 && (
                                        <tr style={{ height: 41 * emptyRightRows }}>
                                            <td colSpan={3} />
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </Root>
                </Box> */}
            </Box>
        </Box>
    );
}