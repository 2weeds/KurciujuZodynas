import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { AdminFunctionsWindow } from "../admin-functions-window/AdminFunctionsWindow";
import { LoginWindow } from "../login-window/LoginWindow";

interface Props {
  setToken: (response: string) => void;
  token: string | undefined;
  page: string;
  pageSetter: (type: string) => void;
  userType:string|undefined;
  setUserType:(type:string) =>void;
}

const useStyles = makeStyles({
  formBox: {
    paddingTop: "3vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
},

formContainer: {
    minWidth: "30vw",
    maxWidth: "70vw",
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
},
});

export const ClientWindow = ({setToken, token, page, userType, pageSetter}: Props) => {
    const styleClasses = useStyles();

    const renderWindow = () => {
      if(token === undefined){
        return <LoginWindow setToken={setToken} />
      }
        else{
          return <AdminFunctionsWindow token={token} page={page} pageSetter={pageSetter} /> 
      }
    }

    return (
      <Box>
        <Box className={styleClasses.formBox}>
          <Box className={styleClasses.formContainer}>
            {renderWindow()}
          </Box>
        </Box>
      </Box>
    )
}