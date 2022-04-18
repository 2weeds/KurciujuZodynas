import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { newLexiconUnitCreationController } from "../../../config/ControllerConfiguration";
import { FIELD_EMPTY, FILE_REQUIRED } from "../../../constants/ErrorConstants";
import useAdminLexiconAdditionWindow from "./useAdminLexiconAdditionWindow";

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
},

fileUploadContainer: {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '3vh',
  alignItems: 'center'
},

uploadButton: {
  marginTop: '1vh',
  background: "#3B429F",
  color: "#EBEBEB",
  fontWeight: 600,
  "&:hover": {
    background: "#6A70C8",
  }
},
})

function isInputDataValid(word: string | undefined, setWordErrors: (error: string) => void,
                          abbr: string | undefined, setAbbrErrors: (error: string) => void,
                          file: File | undefined, setFileErrors: (error: string) => void): boolean {
  const validInputs: boolean[] = [];
  const allowedFileTypes: string[] = ['video/mp4', 'audio/ogg', 'video/webm'];

  if (isInputEmpty(word))
    validInputs.push(true)
  else {
    setWordErrors(FIELD_EMPTY);
  }

  if (isInputEmpty(abbr))
    validInputs.push(true)
  else {
    setAbbrErrors(FIELD_EMPTY);
  }

  if (file !== undefined && allowedFileTypes.includes(file.type))
    validInputs.push(true);
  else {
    setFileErrors(FILE_REQUIRED);
  }

  return validInputs[0] === true && validInputs[1] === true && validInputs[2] === true;
}

function isInputEmpty(input: string | undefined) {
  return input !== undefined && input !== "";
}

function removeExtraWhitespaces(element: string) {
  return element.trim().split(/\s\s+/g).join(' ');
}

function submitHandlerPreset(element: any, setWordErrors: (error: string | undefined) => void,
                                           setAbbrErrors: (error: string | undefined) => void,
                                           setFileErrors: (error: string | undefined) => void): void {
  element.preventDefault();
  setWordErrors(undefined);
  setAbbrErrors(undefined);
  setFileErrors(undefined);
}

export const AdminLexiconAdditionWindow = ({token}: Props) => {
  const [word, updateWord] = useState<string | undefined>("");
  const [wordErrors, setWordErrors] = useState<string | undefined>(undefined);
  const [wordShrink, setWordShrink] = useState<boolean>(false);
  const [abbr, updateAbbr] = useState<string | undefined>("");
  const [abbrErrors, setAbbrErrors] = useState<string | undefined>(undefined);
  const [passShrink, setPassShrink] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
  const [fileErrors, setFileErrors] = useState<string | undefined>(undefined);
  const lexiconUnit = useAdminLexiconAdditionWindow(newLexiconUnitCreationController);
  const styleClasses = useStyles();

  useEffect(() => {
  }, [uploadedFile])

  const handleWordFieldChange = (element: any) => {updateWord(element.target.value)}
  const handleAbbrFieldChange = (element: any) => {updateAbbr(element.target.value)}
  const onFileInputChange = (element: any) => {
    setUploadedFile(element.target.files[0]);
  }
  const handleSubmit = (element: any) => {
      submitHandlerPreset(element, setWordErrors, setAbbrErrors, setFileErrors);

      if (isInputDataValid(word?.trim(), setWordErrors, abbr?.trim(), setAbbrErrors, uploadedFile, setFileErrors)) {
        const trimmedWord = removeExtraWhitespaces(word as string);
        const trimmedAbbr = removeExtraWhitespaces(abbr as string);
        lexiconUnit(trimmedWord, trimmedAbbr, uploadedFile as File, token);
        updateWord("");
        updateAbbr("");
        setUploadedFile(undefined);
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
  const renderFileErrors = () => {
    if (fileErrors !== undefined)
        return <Typography variant="error">{fileErrors}</Typography>
  }

  const renderUploadedFileName = () => {
    if (uploadedFile !== undefined) {
      return <Typography variant="aboutText">{uploadedFile.name}</Typography>
    } else {
      return <Typography variant="aboutText">Galimi failų formatai: .mp4 .ogg .webm</Typography>
    }
  }

  return (
          <Box className={styleClasses.form}>
            <TextField value={word} error={wordErrors !== undefined} className={styleClasses.inputField} onFocus={() => setWordShrink(true)} onBlur={() => setWordShrink(false)} InputLabelProps={{shrink: isInputEmpty(word) || wordShrink ? true : false}} variant="outlined" label="Žodis/vienetas" size="small" onChange={handleWordFieldChange}></TextField>
            {renderWordErrors()}
            <TextField value={abbr} error={abbrErrors !== undefined} className={styleClasses.inputField} onFocus={() => setPassShrink(true)} onBlur={() => setPassShrink(false)} InputLabelProps={{shrink: isInputEmpty(abbr) || passShrink ? true : false}} variant="outlined" label="Trumpinys" size="small" onChange={handleAbbrFieldChange}></TextField>
            {renderAbbrErrors()}
            <Box className={styleClasses.fileUploadContainer}>
              {renderUploadedFileName()}
              <Button variant="contained" component="label" className={styleClasses.uploadButton}>Įkelti failą<input type="file" hidden onChange={onFileInputChange}/></Button>
              {renderFileErrors()}
            </Box>
            <Button className={styleClasses.submitButton} onClick={handleSubmit}>Pridėti leksikos elementą</Button>
          </Box>
  )
}