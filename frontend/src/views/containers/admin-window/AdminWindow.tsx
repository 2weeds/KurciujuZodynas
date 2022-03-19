import React, { useState } from "react";
import { ViewAdminResponse } from "../../../controller/model/ViewAdminResponse";
import { AdminLexiconAdditionForm } from "../admin-lexicon-addition-window/AdminLexiconAdditionForm";
import { AdminLoginWindow } from "../admin-login-window/AdminLoginWindow";

export const AdminWindow = () => {
    const [token, setToken] = useState<ViewAdminResponse | undefined>(undefined);

    return token === undefined ? (
      <AdminLoginWindow setToken={setToken} />
    ) : (
      <AdminLexiconAdditionForm />
    )
}