import { TableCell, Table, TableRow, Typography, TableBody } from "@mui/material"
import React from "react"
import { ViewLexiconUnit } from "../../controller/model/ViewLexiconUnit";

interface Props {
    units: ViewLexiconUnit[];
}

export const LexiconUnitList = ({ units }: Props) => {
    return (
        <Table>
            <TableBody>
        {units.map((unit, index) => (
            <TableRow key={index + "-row"}>
                <TableCell key={index + "-cellWord"}>
                    <Typography key={index + "-word"} pt="1vh" variant="aboutText">{unit.word}</Typography>
                </TableCell>
                <TableCell key={index + "-cellAbbr"}>
                    <Typography key={index + "-abbr"} pt="1vh" variant="aboutText">{unit.abbreviation}</Typography>
                </TableCell>
            </TableRow>
        ))}
            </TableBody>
        </Table>
    )
}