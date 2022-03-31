import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from "react";
import { FIELD_EMPTY, FIELD_TOO_SHORT } from "../../../constants/ErrorConstants";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useSnackbar } from "notistack";

interface Props {
    setToken: (response: string) => void;
}

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
        width: "5vw",
        background: "linear-gradient(45deg, #2196f3 30%, #A9DDD6 90%)",
        color: "#EBEBEB",
        fontWeight: 600,
    }
})

function isInputDataValid(username: string | undefined, password: string | undefined, 
                          setUsernameErrors: (error: string | undefined) => void, setPasswordErrors: (error: string | undefined) => void): boolean {
    const validationArray: boolean[] = [];

    //@ts-ignore
    if (isInputEmpty(username) && username.length > 3)
        validationArray.push(true);
    else
        setAppropriateErrorMessage(username, setUsernameErrors);

    //@ts-ignore
    if (isInputEmpty(password) && password.length > 3)
        validationArray.push(true);
    else
        setAppropriateErrorMessage(password, setPasswordErrors);

    return (validationArray[0] === true && validationArray[1] === true);
}

function isInputEmpty(input: string | undefined) {
    return input !== undefined && input !== "";
}

function setAppropriateErrorMessage(input: string | undefined, setter: (error: string | undefined) => void) {
    input === undefined || input === "" ? setter(FIELD_EMPTY) :
    setter(FIELD_TOO_SHORT);
}

function submitHandlerPreset(element: any, setUsernameErrors: (error: string | undefined) => void, setPasswordErrors: (error: string | undefined) => void): void {
    element.preventDefault();
    setUsernameErrors(undefined);
    setPasswordErrors(undefined);
  }

export const AdminLoginWindow = ({ setToken }: Props) => {
    const [username, updateUsername] = useState<string | undefined>(undefined);
    const [password, updatePassword] = useState<string | undefined>(undefined);
    const [usernameErrors, setUsernameErrors] = useState<string | undefined>(undefined);
    const [passwordErrors, setPasswordErrors] = useState<string | undefined>(undefined);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();
    const styleClasses = useStyles();

    const handlePasswordVisibility = () => setShowPassword(!showPassword);
    const handleUsernameFieldChange = (element: any) => {updateUsername(element.target.value.trim())}
    const handlePasswordFieldChange = (element: any) => {updatePassword(element.target.value.trim())}
    const handleSubmit = (element: any) => {
        submitHandlerPreset(element, setUsernameErrors, setPasswordErrors);
        
        if (isInputDataValid(username, password, setUsernameErrors, setPasswordErrors)) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, username as string, password as string).then((userCredential) => {
                if (userCredential)
                    userCredential.user.getIdToken().then((token) => setToken(token));
            }).catch((err) => {
                enqueueSnackbar("Error: Invalid user credentials", {
                variant: "error",
                preventDuplicate: true,
              })});
        }
    }
    const renderUsernameErrors = () => {
        if (usernameErrors !== undefined)
            return <Typography variant="error">{usernameErrors}</Typography>
    }
    const renderPasswordErrors = () => {
        if (passwordErrors !== undefined)
            return <Typography variant="error">{passwordErrors}</Typography>
    }

    return (
        <Box className={styleClasses.form}>
            <TextField error={usernameErrors !== undefined} className={styleClasses.inputField} variant="outlined" label="El. Paštas" onChange={handleUsernameFieldChange}></TextField>
            {renderUsernameErrors()}
            <TextField error={passwordErrors !== undefined} type={showPassword ? "text" : "password"} className={styleClasses.inputField}
                variant="outlined" label="Slaptažodis" onChange={handlePasswordFieldChange} 
                InputProps={{
                    endAdornment: 
                        <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handlePasswordVisibility}>
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        </InputAdornment>}}>
            </TextField>
            {renderPasswordErrors()}
            <Button className={styleClasses.submitButton} onClick={handleSubmit}>Log in</Button>
        </Box>
    )
}