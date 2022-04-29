import { Request, Response } from "express";
import { SendAllLexiconUnitsUseCase } from "../../use_case/api/SendAllLexiconUnitsUseCase";
import express from 'express';
import FileSaver from 'file-saver';
import * as fs from 'fs';

// import asdfad from './../../../../frontend/src/resources/'

export class SendAllLexiconUnitsRoute {
    private readonly useCase: SendAllLexiconUnitsUseCase;

    constructor(useCase: SendAllLexiconUnitsUseCase) {
        this.useCase = useCase;
    }

    async send(req: Request, res: Response): Promise<void> {
        try {
            this.useCase.send(req.body);
        }
         catch (e) {
            const err = e as Error;
            res.status(400).json(err.message);
        }
    }
}