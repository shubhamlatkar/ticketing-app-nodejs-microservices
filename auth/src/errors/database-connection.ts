import { CustomError } from "./custom-errors";

export class DatabaseConnectionError extends CustomError {
  reason = "Error connectiing DB";
  statusCode = 500;
  constructor() {
    super("Error connectiing DB");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
