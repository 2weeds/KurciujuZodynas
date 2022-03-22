import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { ViewAdminResponse } from "../../../controller/model/ViewAdminResponse";
import { AdminLexiconAdditionWindow } from "../admin-lexicon-addition-window/AdminLexiconAdditionWindow";
import { AdminLoginWindow } from "../admin-login-window/AdminLoginWindow";

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
});

export const AdminWindow = () => {
    const [token, setToken] = useState<ViewAdminResponse | undefined>(undefined);
    const styleClasses = useStyles();

    const renderWindow = () => {
      return token === undefined ? <AdminLoginWindow setToken={setToken} /> : <AdminLexiconAdditionWindow />
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