import { ValidationError } from "express-validator";
import { CustomError } from "./custom-errors";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public error: ValidationError[]) {
    super("Request validation error");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.error.map(error => {
      return {
        message: error.msg,
        field: error.param
      };
    });
  }
}
