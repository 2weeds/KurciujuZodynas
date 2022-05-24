import { Request, Response } from "express";
import { SendLexiconUnitsToExportUseCase } from "../../use_case/api/SendLexiconUnitsToExportUseCase";
export class SendLexiconUnitsToExportRoute {
    private readonly useCase: SendLexiconUnitsToExportUseCase;

    constructor(useCase: SendLexiconUnitsToExportUseCase) {
        this.useCase = useCase;
    }

    async receiveScormProps(req:Request, res: Response):Promise<void>{
        try{
            var obj = {
                authorsName:"",
                generalInformation:"",
            }
            obj = req.body;
            this.useCase.create(obj);
            res.sendStatus(201);
        }
        catch (e){
            const err = e as Error;
            res.status(400).json(err.message);
        }
    }
    async send(req: Request, res: Response): Promise<void> {
        try {
            this.useCase.send(req.body);
            res.sendStatus(201);
        }
        catch (e) {
            const err = e as Error;
            res.status(400).json(err.message);
        }
    }
}