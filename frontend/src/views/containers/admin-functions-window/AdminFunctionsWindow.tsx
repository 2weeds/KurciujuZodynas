import React from "react";
import { ViewAdminResponse } from "../../../controller/model/ViewAdminResponse";
import { AdminAdditionWindow } from "../admin-addition-window/AdminAdditionWindow";
import {AdminExportationWindow} from "../admin-exportation-window/AdminExportationWindow"

interface Props {
  page: string
  pageSetter: (type: string) => void;
}

export const AdminFunctionsWindow = ({page, pageSetter}: Props) => {
    const viewAdminResponse = new ViewAdminResponse("remove");
    const renderWindow = () => {
    return page === "exportation" ? <AdminExportationWindow page={page} pageSetter={pageSetter} /> : <AdminAdditionWindow page={page} pageSetter={pageSetter} token={viewAdminResponse}/>
    }

    return (
        renderWindow()
    )
}
