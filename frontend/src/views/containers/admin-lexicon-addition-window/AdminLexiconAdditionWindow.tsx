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

function isInputDataValid(input: string | undefined, setErrors: (error: string) => void): boolean {

  if (isInputEmpty(input))
    return true;
  else {
    setErrors(FIELD_EMPTY);
  }
  return false;
}

function isInputEmpty(input: string | undefined) {
  return input !== undefined && input !== "";
}

function removeExtraWhitespaces(element: string) {
  return element.trim().split(/ +/).join(' ');
}

function submitHandlerPreset(element: any, setWordErrors: (error: string | undefined) => void, setAbbrErrors: (error: string | undefined) => void): void {
  element.preventDefault();
  setWordErrors(undefined);
  setAbbrErrors(undefined);
}

export const AdminLexiconAdditionWindow = () => {
  const [word, updateWord] = useState<string | undefined>(undefined);
  const [wordErrors, setWordErrors] = useState<string | undefined>(undefined);
  const [wordShrink, setWordShrink] = useState<boolean>(false);
  const [abbr, updateAbbr] = useState<string | undefined>(undefined);
  const [abbrErrors, setAbbrErrors] = useState<string | undefined>(undefined);
  const [passShrink, setPassShrink] = useState<boolean>(false);
  const lexiconUnit = useAdminLexiconAdditionWindow(newLexiconUnitCreationController);
  const styleClasses = useStyles();

  const handleWordFieldChange = (element: any) => {updateWord(element.target.value)}
  const handleAbbrFieldChange = (element: any) => {updateAbbr(element.target.value)}
  const handleSubmit = (element: any) => {
      submitHandlerPreset(element, setWordErrors, setAbbrErrors);

      if (isInputDataValid(word?.trim(), setWordErrors) && isInputDataValid(abbr?.trim(), setAbbrErrors)) {
        const trimmedWord = removeExtraWhitespaces(word as string);
        const trimmedAbbr = removeExtraWhitespaces(abbr as string);
        lexiconUnit(trimmedWord, trimmedAbbr);
        updateWord("");
        updateAbbr("");
      }
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
            <TextField value={word} error={wordErrors !== undefined} className={styleClasses.inputField} onFocus={() => setWordShrink(true)} onBlur={() => setWordShrink(false)} InputLabelProps={{shrink: isInputEmpty(word) || wordShrink ? true : false}} variant="outlined" label="Žodis/vienetas" size="small" onChange={handleWordFieldChange}></TextField>
            {renderWordErrors()}
            <TextField value={abbr} error={abbrErrors !== undefined} className={styleClasses.inputField} onFocus={() => setPassShrink(true)} onBlur={() => setPassShrink(false)} InputLabelProps={{shrink: isInputEmpty(abbr) || passShrink ? true : false}} variant="outlined" label="Trumpinys" size="small" onChange={handleAbbrFieldChange}></TextField>
            {renderAbbrErrors()}
            <Button className={styleClasses.submitButton} onClick={handleSubmit}>Pridėti leksikos elementą</Button>
          </Box>
  )
}