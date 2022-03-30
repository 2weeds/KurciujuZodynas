import { TableCell, Table, TableRow, Typography } from "@mui/material"
import React from "react"
import { ViewPhrase } from "../../controller/model/ViewPhrase";

interface Props {
    phrases: ViewPhrase[];
}

export const PhraseList = ({ phrases }: Props) => {
    return (
        <Table>
        {phrases.map((phrase, index) => (
            <TableRow>
                <TableCell>
                    <Typography key={index + "-phrase"} pt="1vh" variant="aboutText">{phrase.phrase}</Typography>
                </TableCell>
            </TableRow>
        ))}
        </Table>
    )
}