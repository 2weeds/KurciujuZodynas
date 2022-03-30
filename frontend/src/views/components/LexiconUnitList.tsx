import { TableCell, Table, TableRow, Typography } from "@mui/material"
import React from "react"
import { ViewLexiconUnit } from "../../controller/model/ViewLexiconUnit";

interface Props {
    units: ViewLexiconUnit[];
}

export const LexiconUnitList = ({ units }: Props) => {
    return (
        <Table>
        {units.map((unit, index) => (
            <TableRow>
                <TableCell>
                    <Typography key={index + "-word"} pt="1vh" variant="aboutText">{unit.word}</Typography>
                </TableCell>
                <TableCell>
                    <Typography key={index + "-abbr"} pt="1vh" variant="aboutText">{unit.abbreviation}</Typography>
                </TableCell>
            </TableRow>
        ))}
        </Table>
    )
}