import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { newPhraseCreationController } from "../../../config/ControllerConfiguration";
import { FIELD_EMPTY } from "../../../constants/ErrorConstants";
import useAdminPhraseAdditionWindow from "./useAdminPhraseAdditionWindow";

interface Props {
  token: string | undefined
}

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

function submitHandlerPreset(element: any, setErrors: (error: string | undefined) => void): void {
  element.preventDefault();
  setErrors(undefined);
}

export const AdminPhraseAdditionWindow = ({token}: Props) => {
  const [phrase, updatePhrase] = useState<string | undefined>("");
  const [phraseErrors, setPhraseErrors] = useState<string | undefined>(undefined);
  const [phraseShrink, setPhraseShrink] = useState<boolean>(false);
  const phraseUnit = useAdminPhraseAdditionWindow(newPhraseCreationController);
  const styleClasses = useStyles();

  const handlePhraseFieldChange = (element: any) => {updatePhrase(element.target.value)}
  const handleSubmit = (element: any) => {
      submitHandlerPreset(element, setPhraseErrors);

      if (isInputDataValid(phrase?.trim(), setPhraseErrors)) {
        const trimmedPhrase = removeExtraWhitespaces(phrase as string);
        phraseUnit(trimmedPhrase, token);
        updatePhrase("");
      }
  }
  const renderPhraseErrors = () => {
    if (phraseErrors !== undefined)
        return <Typography variant="error">{phraseErrors}</Typography>
  }

  return (
          <Box className={styleClasses.form}>
            <TextField value={phrase} error={phraseErrors !== undefined} className={styleClasses.inputField} onFocus={() => setPhraseShrink(true)} onBlur={() => setPhraseShrink(false)} InputLabelProps={{shrink: isInputEmpty(phrase) || phraseShrink ? true : false}} variant="outlined" label="Žodis/vienetas" size="small" multiline maxRows={5} onChange={handlePhraseFieldChange}></TextField>
            {renderPhraseErrors()}
            <Button className={styleClasses.submitButton} onClick={handleSubmit}>Pridėti frazę</Button>
          </Box>
  )
}