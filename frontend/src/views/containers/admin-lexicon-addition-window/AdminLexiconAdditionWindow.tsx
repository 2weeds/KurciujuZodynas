import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { newLexiconUnitCreationController } from "../../../Configuration";
import { FIELD_EMPTY } from "../../../constants/ErrorConstants";
import useAdminLexiconAdditionWindow from "./useAdminLexiconAdditionWindow";

const useStyles = makeStyles({
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

function isInputDataValid(word: string | undefined, abbr: string | undefined, setWordErrors: (error: string) => void, setAbbrErrors: (error: string) => void): boolean {
  const validationArray: boolean[] = [];

  if (isInputEmpty(word))
    validationArray.push(true);
  else {
    setWordErrors(FIELD_EMPTY);
  }
  
  if (isInputEmpty(abbr))
    validationArray.push(true);
  else {
    setAbbrErrors(FIELD_EMPTY);
  }

  return (validationArray[0] === true && validationArray[1] === true);
}

function isInputEmpty(input: string | undefined) {
  return input !== undefined && input !== "";
}

function submitHandlerPreset(element: any, setWordErrors: (error: string | undefined) => void, setAbbrErrors: (error: string | undefined) => void): void {
  element.preventDefault();
  setWordErrors(undefined);
  setAbbrErrors(undefined);
}

export const AdminLexiconAdditionWindow = () => {
  const [word, updateWord] = useState<string | undefined>(undefined);
  const [abbr, updateAbbr] = useState<string | undefined>(undefined);
  const [wordErrors, setWordErrors] = useState<string | undefined>(undefined);
  const [abbrErrors, setAbbrErrors] = useState<string | undefined>(undefined);
  const lexiconUnit = useAdminLexiconAdditionWindow(newLexiconUnitCreationController);
  const styleClasses = useStyles();

  const handleWordFieldChange = (element: any) => {updateWord(element.target.value.trim())}
  const handleAbbrFieldChange = (element: any) => {updateAbbr(element.target.value.trim())}
  const handleSubmit = (element: any) => {
      submitHandlerPreset(element, setWordErrors, setAbbrErrors);

      if (isInputDataValid(word, abbr, setWordErrors, setAbbrErrors))
        lexiconUnit(word as string, abbr as string);
  }
  const renderWordErrors = () => {
    if (wordErrors !== undefined)
        return <Typography variant="error">{wordErrors}</Typography>
  }
  const renderAbbrErrors = () => {
    if (abbrErrors !== undefined)
        return <Typography variant="error">{abbrErrors}</Typography>
  }

  return (
          <Box className={styleClasses.form}>
            <TextField error={wordErrors !== undefined} className={styleClasses.inputField} variant="outlined" label="Žodis/vienetas" size="small" onChange={handleWordFieldChange}></TextField>
            {renderWordErrors()}
            <TextField error={abbrErrors !== undefined} className={styleClasses.inputField} variant="outlined" label="Trumpinys" size="small" onChange={handleAbbrFieldChange}></TextField>
            {renderAbbrErrors()}
            <Button className={styleClasses.submitButton} onClick={handleSubmit}>Pridėti leksikos elementą</Button>
          </Box>
  )
}