import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { newPhraseCreationController } from "../../../config/ControllerConfiguration";
import { FIELD_EMPTY, FILE_REQUIRED } from "../../../constants/ErrorConstants";
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

fileUploadContainer: {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '3vh',
  alignItems: 'center'
},
})

function isInputDataValid(input: string | undefined, setErrors: (error: string) => void,
                          file: File | undefined, setFileErrors: (error: string) => void): boolean {
  const validInputs: boolean[] = [];
  const allowedFileTypes: string[] = ['video/mp4', 'audio/ogg', 'video/webm'];

  if (isInputEmpty(input))
    validInputs.push(true);
  else {
    setErrors(FIELD_EMPTY);
  }

  if (file !== undefined && allowedFileTypes.includes(file.type))
    validInputs.push(true);
  else {
    setFileErrors(FILE_REQUIRED);
  }
  return validInputs[0] === true && validInputs[1] === true;
}

function isInputEmpty(input: string | undefined) {
  return input !== undefined && input !== "";
}

function removeExtraWhitespaces(element: string) {
  return element.trim().split(/\s\s+/g).join(' ');
}

function submitHandlerPreset(element: any, setErrors: (error: string | undefined) => void, setFileErrors: (error: string | undefined) => void): void {
  element.preventDefault();
  setErrors(undefined);
  setFileErrors(undefined);
}

export const AdminPhraseAdditionWindow = ({token}: Props) => {
  const [phrase, updatePhrase] = useState<string | undefined>("");
  const [phraseErrors, setPhraseErrors] = useState<string | undefined>(undefined);
  const [phraseShrink, setPhraseShrink] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
  const [fileErrors, setFileErrors] = useState<string | undefined>(undefined);
  const phraseUnit = useAdminPhraseAdditionWindow(newPhraseCreationController);
  const styleClasses = useStyles();

  useEffect(() => {
  }, [uploadedFile])

  const handlePhraseFieldChange = (element: any) => {updatePhrase(element.target.value)}
  const handleSubmit = (element: any) => {
      submitHandlerPreset(element, setPhraseErrors, setFileErrors);

      if (isInputDataValid(phrase?.trim(), setPhraseErrors, uploadedFile, setFileErrors)) {
        const trimmedPhrase = removeExtraWhitespaces(phrase as string);
        phraseUnit(trimmedPhrase, uploadedFile as File, token);
        updatePhrase("");
        setUploadedFile(undefined);
      }
  }
  const renderPhraseErrors = () => {
    if (phraseErrors !== undefined)
        return <Typography variant="error">{phraseErrors}</Typography>
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

  const onFileInputChange = (element: any) => {
    setUploadedFile(element.target.files[0]);
  }

  return (
          <Box className={styleClasses.form}>
            <TextField value={phrase} error={phraseErrors !== undefined} className={styleClasses.inputField} onFocus={() => setPhraseShrink(true)} onBlur={() => setPhraseShrink(false)} InputLabelProps={{shrink: isInputEmpty(phrase) || phraseShrink ? true : false}} variant="outlined" label="Frazė" size="small" multiline maxRows={10} onChange={handlePhraseFieldChange}></TextField>
            {renderPhraseErrors()}
            <Box className={styleClasses.fileUploadContainer}>
              {renderUploadedFileName()}
              <Button variant="contained" component="label" className={styleClasses.uploadButton}>Įkelti failą<input type="file" hidden onChange={onFileInputChange}/></Button>
              {renderFileErrors()}
            </Box>
            <Button className={styleClasses.submitButton} onClick={handleSubmit}>Pridėti frazę</Button>
          </Box>
  )
}