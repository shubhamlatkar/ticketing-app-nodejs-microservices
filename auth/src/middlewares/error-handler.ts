import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation";
import { DatabaseConnectionError } from "../errors/database-connection";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError)
    res.status(err.statusCode).send({ errors: err.serializeErrors() });

  if (err instanceof DatabaseConnectionError)
    res.status(err.statusCode).send({ errors: err.serializeErrors() });

  res.status(400).send({
    message: err.message
  });
};
