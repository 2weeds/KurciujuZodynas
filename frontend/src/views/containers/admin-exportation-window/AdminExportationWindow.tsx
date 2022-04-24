<<<<<<< Updated upstream
import { Box, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from 'react';
import { borderRadius, styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  token: string | undefined
  page: string
  pageSetter: (type: string) => void
}
function createData(word: string) {
  return { word };
}

const rows = [
  createData('1 litas'),
  createData('1 mėnuo'),
  createData('žalia'),
  createData('1 asdf'),
  createData('10 bvxczxcvz'),
  createData('1 liwerthgrtetas'),
  createData('1 hwfgscx'),
  createData('zxcvzxc'),
  createData('1 jhgf'),
  createData('10 cvbnm'),
  createData('1 lurytrtyitas'),
  createData('1 rtuy'),
  createData('žalmbnia'),
].sort((a, b) => (a.word < b.word ? -1 : 1));

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "5vh",
    paddingRight: "5vh",
    width: "100%",
    height: "max-content",
    alignItems: "center",
    background: "#EBEBEB",
    boxShadow: "0px 5px 5px 0px #908C93, -10px 5px 5px -5px #908C93, 10px 5px 5px -5px #908C93",
    borderRadius: 10,
    clear: "both",
    overflow: "auto"
  },

  inputField: {
    marginTop: "5vh",
    paddingBottom: "5vh",
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
    align-items: flex-start;
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


export const AdminExportationWindow = ({ token, page, pageSetter }: Props) => {
  const [tablePage, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState("");
  const emptyRows =
    tablePage > 0 ? Math.max(0, (1 + tablePage) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const styleClasses = useStyles();
  return (

    <Box className={styleClasses.form}>
      <Root sx={{ maxWidth: '100%', width: 500 }}>
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
              <th>
              </th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
                ? rows.slice(tablePage * rowsPerPage, tablePage * rowsPerPage + rowsPerPage)
                : rows)
              .filter((val)=>{
                if(searchTerm==""){
                  return val
                }
                else if(val.word.toLowerCase().includes(searchTerm.toLowerCase())){
                  return val
                }
              }).map((row) => (
                <tr key={row.word}>
                  <td style={{ width: 500 }} align="right">
                    {row.word}
                  </td>
                  <td><AddIcon className={styleClasses.addWordForExportationButton} onClick={() => { }}></AddIcon></td>
                </tr>
              ))
            }
            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
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
                rowsPerPage={rowsPerPage}
                page={tablePage}
                componentsProps={{
                  select: {
                    'aria-label': 'rows per tablePage',
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  } as any,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
      </Root>
    </Box>
  );
=======
import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Props {
  token: string | undefined
  page: string
  pageSetter: (type: string) => void
}

const useStyles = makeStyles({
  submitButton: {
    display: "flex",
    flex: "row",
    marginTop: "2vh",
    marginBottom: "2vh",
    marginRight: "2vh",
    marginLeft: "2vh",
    width: "15vw",
    background: "linear-gradient(45deg, #2196f3 30%, #A9DDD6 90%)",
    color: "#EBEBEB",
    fontWeight: 600,
  },
  form: {
    maxHeight: "10vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
})


export const AdminExportationWindow = ({ token, page, pageSetter }: Props) => {
  const styleClasses = useStyles();
  return (
    <Box className={styleClasses.form}>
      <Button className={styleClasses.submitButton} onClick={() => pageSetter("exportPhrase")}>
        Eksportuoti frazę
      </Button>
      <Button className={styleClasses.submitButton} onClick={() => pageSetter("exportLexicon")}>
        Eksportuoti leksikos vienetą
      </Button>
    </Box>
  );
>>>>>>> Stashed changes
}