import { Errback, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

function errorHandler(
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    const validationError = fromZodError(err);
    return res.status(400).json(validationError);
  }

  return res.status(500).json({
    message: "Something Wrong with the server",
    error: err,
  });
}

export default errorHandler;
