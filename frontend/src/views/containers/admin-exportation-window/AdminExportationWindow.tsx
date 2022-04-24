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
}