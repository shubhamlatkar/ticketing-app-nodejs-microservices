import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email")
      .isEmail()
      .withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must enter valid pass")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let existingUser = await User.findOne({ email });

    if (!existingUser) throw new BadRequestError("Invalid cred");

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) throw new BadRequestError("Invalid cred");
    const userJWT = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email
      },
      process.env.JWT_SECRET!
    );

    req.session = {
      jwt: userJWT
    };
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
