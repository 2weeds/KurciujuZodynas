import { Request, Response } from "express";
import { CreateNewLexiconUnitUseCase } from "../../use_case/api/CreateNewLexiconUnitUseCase";
import { tokenDecoder } from '../tokenDecoder';

interface RequestWithFile extends Request {
    file: any,
}

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'src\\fileStorage\\lexicon')
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({storage}).single('file');

export class CreateNewLexiconUnitRoute {
    private readonly useCase: CreateNewLexiconUnitUseCase;

    constructor(useCase: CreateNewLexiconUnitUseCase) {
        this.useCase = useCase;
    }

    async create(req: RequestWithFile, res: Response): Promise<void> {
        const headers = req.headers;
        try {
            if (await tokenDecoder(headers.authorization)) {
                upload(req, res, () => {
                    try {
                        this.useCase.create(req.body.word, req.body.abbreviation, req.file);
                        res.sendStatus(201);
                    } catch (e) {
                        const err = e as Error;
                        res.status(400).json(err.message);
                    }
                })
            } else {
                res.status(400).json("Unauthorized");
            }
        } catch (e) {
            const err = e as Error;
            res.status(400).json(err.message);
        }
    }
}