import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const useStyles = makeStyles({
  formBox: {
    paddingTop: "3vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
},

formContainer: {
    width: "30vw",
    height: "60vh",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
},

form: {
    display: "flex",
    flexDirection: "column",
    width: "85%",
    height: "85%",
    alignItems: "center",
    background: "#EBEBEB",
    boxShadow: "0px 5px 5px 0px #908C93, -10px 5px 5px -5px #908C93, 10px 5px 5px -5px #908C93",
    borderRadius: 10,
},

inputField: {
    marginTop: "5vh",
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

submitButton: {
    marginTop: "5vh",
    width: "15vw",
    background: "linear-gradient(45deg, #2196f3 30%, #A9DDD6 90%)",
    color: "#EBEBEB",
    fontWeight: 600,
}
})
function isInputDataValid(word: string | undefined, abbr: string | undefined, setWordErrors: any, setAbbrErrors: any): boolean {
  const validationArray: boolean[] = [];

  if (word !== undefined && word !== "")
    validationArray.push(true);
  else {
    setWordErrors("Klaidingai įvestas žodis");
  }
  if (abbr !== undefined && abbr !== "")
    validationArray.push(true);
  else {
    setAbbrErrors("Klaidingai įvestas trumpinys");
  }

  return (validationArray[0] === true && validationArray[1] === true);
}

export const AdminLexiconAdditionForm = () => {
  const [word, updateWord] = useState<any | undefined>(undefined);
  const [abbr, updateAbbr] = useState<any | undefined>(undefined);
  const [wordErrors, setWordErrors] = useState<string | undefined>(undefined);
  const [abbrErrors, setAbbrErrors] = useState<string | undefined>(undefined);
  const styleClasses = useStyles();

  const handleUsernameFieldChange = (element: any) => {
      updateWord(element.target.value.trim())
  }

  const handlePasswordFieldChange = (element: any) => {
      updateAbbr(element.target.value.trim())
  }

  const handleSubmit = (element: any) => {
      element.preventDefault();
      setWordErrors(undefined);
      setAbbrErrors(undefined);
      if (isInputDataValid(word, abbr, setWordErrors, setAbbrErrors))
        console.log(word, abbr);
  }

  const renderWordErrors = () => {
    if (wordErrors !== undefined)
        return <Typography variant="error">Patikrinkite žodžio įvedimą</Typography>
  }

  const renderAbbrErrors = () => {
    if (abbrErrors !== undefined)
        return <Typography variant="error">Patikrinkite žodžio trumpinio įvedimą</Typography>
  }

  return (
    <Box>
      <Box className={styleClasses.formBox}>
        <Box className={styleClasses.formContainer}>
          <Box className={styleClasses.form}>
            <TextField error={wordErrors !== undefined} className={styleClasses.inputField} variant="outlined" label="Žodis/vienetas" size="small" onChange={handleUsernameFieldChange}></TextField>
            {renderWordErrors()}
            <TextField error={abbrErrors !== undefined} className={styleClasses.inputField} variant="outlined" label="Trumpinys" size="small" onChange={handlePasswordFieldChange}></TextField>
            {renderAbbrErrors()}
            <Button className={styleClasses.submitButton} onClick={handleSubmit}>Pridėti leksikos elementą</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}