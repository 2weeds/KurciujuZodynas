import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { adminAuthorizationController } from "../../../Configuration";
import { ViewAdminResponse } from "../../../controller/model/ViewAdminResponse";
import useAdminLoginWindow from "./useAdminLoginWindow";

interface Props {
    setToken: (response: ViewAdminResponse) => void;
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
        width: "5vw",
        background: "linear-gradient(45deg, #2196f3 30%, #A9DDD6 90%)",
        color: "#EBEBEB",
        fontWeight: 600,
    }
})

function isInputDataValid(username: string | undefined, password: string | undefined, setUsernameErrors: any, setPasswordErrors: any): boolean {
    const validationArray: boolean[] = [];
    if (username !== undefined && username !== "" && username.length > 3)
        validationArray.push(true);
    else {
        setUsernameErrors("Klaidingai įvestas slapyvardis");
    }
    if (password !== undefined && password !== "" && password.length > 3)
        validationArray.push(true);
    else {
        setPasswordErrors("Klaidingai įvestas slaptažodis");
    }
    return (validationArray[0] === true && validationArray[1] === true);
}

export const AdminLoginWindow = ({ setToken }: Props) => {
    const [username, updateUsername] = useState<string | undefined>(undefined);
    const [password, updatePassword] = useState<string | undefined>(undefined);
    const [usernameErrors, setUsernameErrors] = useState<string | undefined>(undefined);
    const [passwordErrors, setPasswordErrors] = useState<string | undefined>(undefined);
    const adminUser = useAdminLoginWindow(adminAuthorizationController, setToken);
    const styleClasses = useStyles();

    const handleUsernameFieldChange = (element: any) => {
        updateUsername(element.target.value.trim())
    }

    const handlePasswordFieldChange = (element: any) => {
        updatePassword(element.target.value.trim())
    }

    const handleSubmit = (element: any) => {
        element.preventDefault();
        setUsernameErrors(undefined);
        setPasswordErrors(undefined);
        if (isInputDataValid(username, password, setUsernameErrors, setPasswordErrors))
            adminUser(username as string, password as string);
    }

    const renderUsernameErrors = () => {
        if (usernameErrors !== undefined)
            return <Typography variant="error">Patikrinkite slapyvardžio įvedimą</Typography>
    }

    const renderPasswordErrors = () => {
        if (passwordErrors !== undefined)
            return <Typography variant="error">Patikrinkite slaptažodžio įvedimą</Typography>
    }

    return (
        <Box>
            <Box className={styleClasses.formBox}>
                <Box className={styleClasses.formContainer}>
                    <Box className={styleClasses.form}>
                        <TextField error={usernameErrors !== undefined} className={styleClasses.inputField} variant="outlined" label="Slapyvardis" onChange={handleUsernameFieldChange}></TextField>
                        {renderUsernameErrors()}
                        <TextField error={passwordErrors !== undefined} className={styleClasses.inputField} variant="outlined" label="Slaptažodis" onChange={handlePasswordFieldChange}></TextField>
                        {renderPasswordErrors()}
                        <Button className={styleClasses.submitButton} onClick={handleSubmit}>Log in</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}