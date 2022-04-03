import React from "react";
import { AdminAdditionWindow } from "../admin-addition-window/AdminAdditionWindow";
import {AdminExportationWindow} from "../admin-exportation-window/AdminExportationWindow"

interface Props {
token: string | undefined
  page: string
  pageSetter: (type: string) => void;
}

export const AdminFunctionsWindow = ({token, page, pageSetter}: Props) => {
    const renderWindow = () => {
    return page === "exportation" ? <AdminExportationWindow token={token} page={page} pageSetter={pageSetter} /> : <AdminAdditionWindow page={page} pageSetter={pageSetter} token={token}/>
    }

    return (
        renderWindow()
    )
}
