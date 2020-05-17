import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation";
import { DatabaseConnectionError } from "../errors/database-connection";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password should be in len 4 to 20")
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log("errors", errors);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    console.log("Creating user");
    throw new DatabaseConnectionError();
    // res.send("signup");
  }
);

export { router as signupRouter };
