import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { AdminFunctionsWindow } from "../admin-functions-window/AdminFunctionsWindow";
import { AdminLoginWindow } from "../admin-login-window/AdminLoginWindow";

interface Props {
  setToken: (response: string) => void;
  token: string | undefined
  page: string
  pageSetter: (type: string) => void
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

export const AdminWindow = ({setToken, token, page, pageSetter}: Props) => {
    const styleClasses = useStyles();

    const renderWindow = () => {
      return token === undefined ? <AdminLoginWindow setToken={setToken} /> : <AdminFunctionsWindow token={token} page={page} pageSetter={pageSetter} />
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