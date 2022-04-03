import { TableCell, Table, TableRow, Typography, TableBody } from "@mui/material"
import React from "react"
import { ViewPhrase } from "../../controller/model/ViewPhrase";

interface Props {
    phrases: ViewPhrase[];
}

export const PhraseList = ({ phrases }: Props) => {
    return (
        <Table>
            <TableBody>
        {phrases.map((phrase, index) => (
            <TableRow key={index + "-row"}>
                <TableCell key={index + "-cell"}>
                    <Typography key={index + "-phrase"} pt="1vh" variant="aboutText">{phrase.phrase}</Typography>
                </TableCell>
            </TableRow>
        ))}
            </TableBody>
        </Table>
    )
}