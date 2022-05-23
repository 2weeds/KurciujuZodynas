import { Request, Response } from "express";
import { SendPhrasesToExportUseCase } from "../../use_case/api/SendPhrasesToExportUseCase";

export class SendPhrasesToExportRoute {
    private readonly useCase: SendPhrasesToExportUseCase;

    constructor(useCase: SendPhrasesToExportUseCase) {
        this.useCase = useCase;
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
}