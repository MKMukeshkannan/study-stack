import { NextFunction, Request, Response , Errback} from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

function errorHandler(err : Errback, req: Request, res : Response, next: NextFunction) {
  if (err instanceof ZodError) {
    const validationError = fromZodError(err);
    res.status(400).json( validationError );
  }
 
  res.status(500).send("Something Wrong with the server")
}

export default errorHandler;
